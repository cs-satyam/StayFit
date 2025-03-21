// 📌 Import Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// 📌 Define User Schema
const userSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },

    // 🔹 Health & Fitness Info
    age: { type: Number, min: 10, max: 100 },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    height: { type: Number, min: 50, max: 250 }, // cm
    weight: { type: Number, min: 20, max: 300 }, // kg
    goal: { type: String, enum: ["Weight Loss", "Muscle Gain", "Fitness"] },

    // 🔹 Activity Tracking
    workoutHistory: [
      {
        date: { type: Date, default: Date.now },
        workoutType: { type: String, required: true },
        duration: { type: Number, required: true, min: 1 }, // min workout time
        caloriesBurned: { type: Number, default: 0 }
      }
    ],
    caloriesBurned: { type: Number, default: 0 },
    stepsTaken: { type: Number, default: 0 },

    // 🔹 User Role & Profile
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profilePic: { type: String, default: "https://example.com/default.png" },

    // 🔹 Timestamps
    lastLogin: { type: Date }
  },
  { timestamps: true } // ✅ Automatically adds createdAt & updatedAt fields
);

// 🔐 Hash Password Before Saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// 🔐 Hash Password Before Updating via findOneAndUpdate
userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 12);
    }
    next();
});

// 🔑 Compare Passwords Method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 🔄 Update Last Login
userSchema.methods.updateLastLogin = async function () {
    this.lastLogin = Date.now();
    await this.save();
};

// 📌 Export User Model
const User = mongoose.model("User", userSchema);
module.exports = User;
