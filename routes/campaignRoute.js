const express = require("express");
const router = express.Router();
const {
  getAllCampaigns,
  getSingleCampaign,
  createCampaign,
  updateCampaign,
} = require("../controllers/campaignController");
const { fetchUser, authRole } = require("../middlewares/auth");

router.route("/campaigns").get(getAllCampaigns);
router
  .route("/campaign/new")
  .post(fetchUser, authRole("owner", "admin"), createCampaign);
router
  .route("/campaign/:id")
  .get(getSingleCampaign)
  .delete(fetchUser, authRole("owner", "admin"), deleteCampaign)
  .put(fetchUser, authRole("owner", "admin"), updateCampaign);

module.exports = router;
