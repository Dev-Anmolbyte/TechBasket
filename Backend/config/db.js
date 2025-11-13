const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://techbasket:tech@cluster0.5xdv2sr.mongodb.net/tech_product"
    );
    console.log("MongoDB connected ");
  } catch (error) {
    console.error("MongoDB connection failed ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
