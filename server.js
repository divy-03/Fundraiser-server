const app = require("./app");
const cloudinary = require("cloudinary").v2;
const connectToDb = require("./db/connect");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectToDb(); // Wait for the connection to be established
    app.listen(port, () => {
      console.log(`Server is working on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
  }
})();

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit();
});
