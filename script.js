document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartCountEl = document.getElementById("cart-count");
    const cartItemsEl = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const cartBtn = document.getElementById("cart-btn");
    const cartModal = document.getElementById("cart-modal");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Smooth scrolling for nav links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Button click animation
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 150);
        });
    });

    // Quantity selectors on food cards
    document.querySelectorAll(".food-card").forEach(card => {
        const minusBtn = card.querySelector(".minus");
        const plusBtn = card.querySelector(".plus");
        const qtyEl = card.querySelector(".qty");

        minusBtn.addEventListener("click", () => {
            let qty = parseInt(qtyEl.textContent);
            if (qty > 1) qty--;
            qtyEl.textContent = qty;
        });

        plusBtn.addEventListener("click", () => {
            let qty = parseInt(qtyEl.textContent);
            qty++;
            qtyEl.textContent = qty;
        });
    });

    // Add to Cart button
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const card = btn.closest(".food-card");
            const name = card.querySelector("h3").textContent;
            const priceText = card.querySelector("p").textContent;
            const price = parseFloat(priceText.replace("GHS", "").trim());
            const qty = parseInt(card.querySelector(".qty").textContent);

            // Check if item already in cart
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity += qty;
            } else {
                cart.push({ name, price, quantity: qty });
            }

            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemsEl.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.textContent = `${item.name} x ${item.quantity} - GHS ${item.price * item.quantity}`;

            // Quantity controls inside cart modal
            const plus = document.createElement("button");
            plus.textContent = "+";
            plus.addEventListener("click", () => {
                item.quantity++;
                updateCart();
            });

            const minus = document.createElement("button");
            minus.textContent = "-";
            minus.addEventListener("click", () => {
                item.quantity--;
                if (item.quantity <= 0) cart.splice(cart.indexOf(item), 1);
                updateCart();
            });

            li.appendChild(minus);
            li.appendChild(plus);
            cartItemsEl.appendChild(li);
        });

        cartTotalEl.textContent = total.toFixed(2);
    }

    // Show cart modal
    cartBtn.addEventListener("click", () => {
        cartModal.style.display = "flex";
    });

    // Close cart modal
    closeCartBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Checkout → WhatsApp
    checkoutBtn.addEventListener("click", () => {
        if(cart.length === 0) return alert("Cart is empty!");
        let message = "Hello Esi’s Kitchen 👋\nI would like to order:\n";
        cart.forEach(item => {
            message += `${item.name} x ${item.quantity} - GHS ${item.price * item.quantity}\n`;
        });
        message += `Total: GHS ${cart.reduce((sum, item) => sum + item.price*item.quantity,0)}`;

        const whatsappURL = "https://wa.me/233541682058?text=" + encodeURIComponent(message);
        window.open(whatsappURL, "_blank");
    });
});
