const mongoose = require("mongoose");

const { Schema } = mongoose;

const campaignSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter the campaign title"],
    },
    description: {
        type: String,
        required: [true, "Please enter the campaign description"],
    },
    totalDonationGoal: {
        type: Number,
        required: [true, "Please enter the total donation goal"],
    },
    totalDonationsMade: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Campaign", campaignSchema);