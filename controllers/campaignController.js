const Campaign = require("../models/campaignModel");
const catchAsync = require("../middlewares/catchAsync");
const resError = require("../tools/resError");
const resSuccess = require("../tools/resSuccess");
const cloudinary = require("cloudinary");

exports.createCampaign = catchAsync(async (req, res) => {
  const { title, desc, donationGoal, donationsMade, coverImg } = req.body;

  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (coverImg && coverImg.length > maxSize) {
    return resError(400, "Avatar file size exceeds 5MB limit", res);
  }

  const cover = await cloudinary.v2.uploader.upload(coverImg, {
    folder: "campaigns",
    width: 300,
    crop: "scale",
  });

  const campaign = await Campaign.create({
    title,
    desc,
    donationGoal,
    donationsMade,
    coverImg: {
      public_id: cover.public_id,
      url: cover.secure_url,
    },
  });

  return resSuccess(201, campaign, res);
});

exports.getAllCampaigns = catchAsync(async (req, res) => {
  const campaigns = await Campaign.find();

  return resSuccess(200, campaigns, res);
});

exports.getSingleCampaign = catchAsync(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return resError(404, "Campaign not found", res);
  }

  resSuccess(200, campaign, res);
});

exports.deleteCampaign = catchAsync(async (req, res) => {
  const campaign = await Campaign.findByIdAndDelete(req.params.id);

  if (!campaign) {
    return resError(404, "Campaign not found", res);
  }

  await cloudinary.v2.uploader.destroy(campaign.coverImg.public_id);
  await campaign.remove();
  return resSuccess(204, null, res);
});

exports.updateCampaign = catchAsync(async (req, res) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!campaign) {
    return resError(404, "Campaign not found", res);
  }

  resSuccess(200, campaign, res);
});
