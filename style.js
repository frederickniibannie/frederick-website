// MAKE SURE JS IS RUNNING
document.addEventListener("DOMContentLoaded", () => {

    // Smooth scrolling for navbar links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Button click animation
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 150);
        });
    });

    // FOOD CARD CLICK → WHATSAPP ORDER
    document.querySelectorAll(".food-card").forEach(card => {
        card.style.cursor = "pointer";

        card.addEventListener("click", () => {
            const foodName = card.querySelector("h3").textContent;
            const foodPrice = card.querySelector("p").textContent;

            const message =
                `Hello Esi’s Kitchen 👋\n` +
                `I would like to order:\n` +
                `${foodName}\n` +
                `Price: ${foodPrice}`;

            const whatsappLink =
                "https://wa.me/233541682058?text=" +
                encodeURIComponent(message);

            window.open(whatsappLink, "_blank");
        });
    });

});
