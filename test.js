const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); // Ensure this path is correct

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);  // ✅ Prefix routes with "/auth"

mongoose.connect("mongodb://localhost:27017/fitnessDB", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));
