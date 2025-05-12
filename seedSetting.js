require("dotenv").config();
const mongoose = require("mongoose");
const Setting = require("./models/setting"); // Your
const seedSettings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing
    await Setting.deleteMany();

    // Insert default setting
    const setting = await Setting.create({
      miniBookingLength: 5,
      maxBookingLength: 90,
      maxNumberOfGuestsPerBooking: 8,
      breakfastPrice: 20,
    });

    console.log("Seeded setting:", setting);
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedSettings();
