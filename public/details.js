document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart"); // select all buttons

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const itemId = this.getAttribute("data-id");
            const itemName = this.getAttribute("data-name");
            const itemPrice = parseFloat(this.getAttribute("data-price"));
            const itemImage = this.getAttribute("data-image");

            // retrieve existing cart from localStorage 
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // check if item is already in the cart
            let existingItem = cart.find(item => item.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: itemId, name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
            }

            // save updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // redirect to cart page
            window.location.href = "cart.html";
        });
    });
});
