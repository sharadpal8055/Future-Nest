import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = "admin@elearning.com";

    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",
      email: adminEmail,
      passwordHash,
      role: "admin"
    });

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Admin seed failed:", error);
    process.exit(1);
  }
};

createAdmin();
