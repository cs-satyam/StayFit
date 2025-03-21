// // home .js; JavaScript for Home Page
// document.addEventListener("DOMContentLoaded", function () {
//     // Initial Stats Update
//     const stats = { calories: 1200, steps: 8500, sleep: 7, workouts: 5 };
//     updateStats(stats);

//     // Smooth Navbar Show/Hide on Scroll
//     handleNavbarScroll();

//     // Expose BMI functions globally
//     window.updateValues = updateValues;
//     window.calculateBMI = calculateBMI;

//     // Initialize Logo Animation
//     initializeLogoAnimation();
// });

// /** Updates Fitness Stats UI */
// function updateStats(stats) {
//     let caloriesElem = document.getElementById("calories");
//     let stepsElem = document.getElementById("steps");
//     let sleepElem = document.getElementById("sleep");
//     let workoutsElem = document.getElementById("workouts");

//     if (caloriesElem && stepsElem && sleepElem && workoutsElem) {
//         caloriesElem.textContent = stats.calories;
//         stepsElem.textContent = stats.steps;
//         sleepElem.textContent = `${stats.sleep} hrs`;
//         workoutsElem.textContent = stats.workouts;
//     }
// }

// /** Handles Smooth Navbar Hide/Show on Scroll */
// function handleNavbarScroll() {
//     let lastScrollTop = 0;
//     const header = document.querySelector("header");

//     if (!header) return; // Avoid errors if header is missing

//     window.addEventListener("scroll", function () {
//         let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//         if (scrollTop > lastScrollTop) {
//             header.style.transform = "translateY(-100%)";
//             header.style.opacity = "0";
//         } else {
//             header.style.transform = "translateY(0)";
//             header.style.opacity = "1";
//         }

//         lastScrollTop = scrollTop;
//     });
// }

/** Updates weight/height values and recalculates BMI */
function updateValues() {
    let weightElem = document.getElementById("weightValue");
    let heightElem = document.getElementById("heightValue");
    let weightRange = document.getElementById("weightRange");
    let heightRange = document.getElementById("heightRange");

    if (!weightElem || !heightElem || !weightRange || !heightRange) return;

    weightElem.innerText = weightRange.value;
    heightElem.innerText = heightRange.value;
    calculateBMI();
}

/** Calculates BMI and updates UI */
function calculateBMI() {
    let weight = document.getElementById("weightRange")?.value;
    let height = document.getElementById("heightRange")?.value / 100;

    if (!weight || !height) return;

    let bmi = (weight / (height * height)).toFixed(2);
    let resultElem = document.getElementById("result");

    if (resultElem) resultElem.innerText = `Your BMI is ${bmi}`;
    updateNeedle(bmi);
}

/** Updates the BMI gauge needle based on BMI value */
function updateNeedle(bmi) {
    let needle = document.getElementById("needle");
    if (!needle) return;

    let angle = -90 + bmi * 4;
    needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
}

/** Initializes Logo Hover Animation */
function initializeLogoAnimation() {
    const image = document.querySelector(".image-container img");
    if (!image) return;

    image.addEventListener("mousemove", (e) => {
        let rect = image.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width - 0.5;
        let y = (e.clientY - rect.top) / rect.height - 0.5;

        let rotateX = y * -40;
        let rotateY = x * 40;

        image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    image.addEventListener("mouseleave", () => {
        image.style.transform = "rotateX(0) rotateY(0)";
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const statBoxes = document.querySelectorAll(".stat-box");

    function showImagesOnScroll() {
        let scrollPosition = window.scrollY + window.innerHeight;

        statBoxes.forEach((box, index) => {
            let boxPosition = box.offsetTop;
            if (scrollPosition > boxPosition) {
                setTimeout(() => {
                    box.classList.add("visible");
                }, index * 300); // Delay each image appearing
            }
        });
    }

    window.addEventListener("scroll", showImagesOnScroll);
    showImagesOnScroll(); // Initial check in case stats are already in view
});



document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const blurBg = document.querySelector(".blur-bg");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            blurBg.classList.toggle("active");
        });

        // Close menu when clicking outside
        blurBg.addEventListener("click", function () {
            navLinks.classList.remove("active");
            blurBg.classList.remove("active");
        });
    }
});

