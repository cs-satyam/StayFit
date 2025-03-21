const bcrypt = require("bcrypt");

const hashedPassword = "$2b$10$cD66jE10LyeV90n8Qf6pYenSgKxnBtXzHOtTwy3XWMCedJc.lGan.";
const inputPassword = "satyam@123"; // Try different guesses here

bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
    if (err) {
        console.error("Error comparing password:", err);
        return;
    }

    if (result) {
        console.log("✅ Password is correct!");
    } else {
        console.log("❌ Incorrect password.");
    }
});
