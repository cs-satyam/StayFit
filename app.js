const express = require("express");
const connectDB = require("./config/db"); // MongoDB connection
const morgan = require("morgan"); // HTTP request logger
const path = require("path"); // For static file paths
require("dotenv").config(); // Load environment variables

const app = express();

const port = process.env.PORT 

// ✅ Connect to MongoDB
connectDB();

// ✅ Set EJS as View Engine
app.set("view engine", "ejs");


// ✅ Serve Static Files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ✅ Log HTTP requests using Morgan
app.use(morgan("dev"));

// ✅ Define Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);


const updateRoutes = require("./routes/user");
app.use("/", updateRoutes);


// ✅ Home Route
app.get("/", (req, res) => {
    res.render("home");
});


// ✅ Render Login Page
app.get("/login", (req, res) => {
    console.log("GET /login route hit");
    res.render("login", { message: req.query.message || null });
});



// ✅ Profile Route
app.get("/profile", (req, res) => {
    console.log("GET /profile route hit");
    res.render("profile");
});






// ✅ Handle Registration Success Redirect
app.post("/auth/register", (req, res) => {
    console.log("POST /auth/register route hit with data:", req.body);
    res.redirect("/login?message=Registration%20successful");
});






// ✅ Contact Form Route (Simulating Email Sending)
app.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    console.log("📩 Received Contact Form:", { name, email, message });

    // Simulating Email Sending Success Response
    return res.status(200).json({ success: "Email sent successfully!" });
});




// ✅ Handle 404 Errors
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});



// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
