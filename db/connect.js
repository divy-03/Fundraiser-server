const mongoose = require("mongoose");

const uri =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI
    : process.env.ATLAS_URI;

const connectToAtlas = async () => {
  try {
    await mongoose.connect(String(uri)).then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1);
  }
};

module.exports = connectToAtlas;
