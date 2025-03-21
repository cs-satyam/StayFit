document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("1EtSfu3m4al7tEqV-"); 

    const contactForm = document.getElementById("email");

    if (!contactForm) {
        console.error("❌ Contact form not found. Check your form ID in HTML.");
        return;
    }

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = {
            from_name: document.querySelector("input[name='name']").value,
            from_email: document.querySelector("input[name='email']").value,
            message: document.querySelector("textarea[name='message']").value
        };

        console.log("📩 Sending Email with Data:", formData); 

        emailjs.send("service_p9y7zbq", "template_xxz5xgh", formData, "1EtSfu3m4al7tEqV-")
            .then(response => {
                alert("✅ Message Sent Successfully!");
                contactForm.reset();
            })
            .catch(error => {
                alert("❌ Failed to send message. Please try again.");
                console.error("EmailJS Error:", error);
            });
    });
});
