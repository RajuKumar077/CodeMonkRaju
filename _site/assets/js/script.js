document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const nav = document.querySelector("nav");

    // Check Local Storage for Theme
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if (themeToggle) themeToggle.textContent = "☀️";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            const isDarkMode = body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
            themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
        });
    }

    // Smooth Scroll
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        if (nav) {
            nav.style.background = window.scrollY > 50 ? "#000" : "rgba(0, 0, 0, 0.9)";
            nav.style.boxShadow = window.scrollY > 50 ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none";
        }
    });

    // Matrix Background Effect
    const canvas = document.getElementById("matrixCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let fontSize = 16;
        let columns, drops;
        
        function initializeMatrix() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        }

        initializeMatrix();

        const letters = "010101 AI FUTURE NEURAL 101010".split("");

        function drawMatrix() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00FF00";
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((drop, i) => {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drop * fontSize);

                if (drop * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        }

        setInterval(drawMatrix, 50);

        // Handle Window Resize
        window.addEventListener("resize", initializeMatrix);
    }
});
