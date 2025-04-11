document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById("cart-items");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // function to update the cart ui
    function updateCartUI() {
        cartContainer.innerHTML = ""; // clear current cart items

        let subtotal = 0; // initialize subtotal

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity; // calculate total for each item
            subtotal += itemTotal; // add to subtotal

            // create cart item html dynamically
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-details">
                        <h3>${item.name}</h3>
                        <p>price: $${item.price.toFixed(2)}</p>
                        <label>quantity:</label>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity">
                        <p>total: $${itemTotal.toFixed(2)}</p>
                    </div>
                    <button class="remove" data-index="${index}">remove</button>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML; // add item to cart ui
        });
        
        // add event listeners for remove buttons
        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1); // remove item from cart array
                localStorage.setItem("cart", JSON.stringify(cart)); // update localstorage
                updateCartUI(); // refresh ui
            });
        });

        // add event listeners for quantity input changes
        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("change", function() {
                let index = this.getAttribute("data-index");
                cart[index].quantity = parseInt(this.value); // update quantity
                localStorage.setItem("cart", JSON.stringify(cart)); // save changes
                updateCartUI(); // refresh ui
            });
        });

        // update cart summary values
        document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
        let tax = subtotal * 0.0675; // calculate tax
        document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
        document.getElementById("total").innerText = `$${(subtotal + tax).toFixed(2)}`;
    }

    updateCartUI(); // initialize cart ui when page loads
});
