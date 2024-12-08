document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { productsID: "pro0001", id: "MA1107", name: "Screen - MA1107", description: "Screen suitable for medium scale classes", size: "113 x 113", price: 100000, quantity: 1, image: "assets/logo.jpg" },
        { productsID: "pro0002", id: "MA1108", name: "Screen - MA1108", description: "Screen suitable for medium scale classes", size: "223 x 223", price: 200000, quantity: 2, image: "assets/logo.jpg" }
    ];

    const cartItemsContainer = document.querySelector(".cartitems");
    const summaryContainer = document.querySelector(".sumproducts");
    const totalContainer = document.querySelector(".total");
    const clearCartButton = document.querySelector(".clear");
    const shippingCost = 10000;

    function displayCart() {
        cartItemsContainer.innerHTML = "";
        summaryContainer.innerHTML = "";

        if (products.length === 0) {
            cartItemsContainer.textContent = "Your cart is empty";
            totalContainer.textContent = "Please add items to calculate the summary";
            return;
        }

        let total = 0;

        products.forEach((product, index) => {
            const cartItem = `
                <div class="cart-item">
                    <div class="imghead">
                        <h4>${product.name}</h4>
                        <img src="${product.image}" alt="item" height="200px" width="300px" style="border-radius: 6px; margin-top: 10px;">
                    </div>
                    <div class="details">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <p>Size: ${product.size}</p>
                        <p>Price: Rs. ${product.price.toLocaleString()}</p>
                        <p>Quantity: ${product.quantity}</p>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML("beforeend", cartItem);

            const summaryItem = `
                <p>${product.name} x ${product.quantity} = Rs. ${(product.price * product.quantity).toLocaleString()}</p>
            `;
            summaryContainer.insertAdjacentHTML("beforeend", summaryItem);

            total += product.price * product.quantity;
        });

        summaryContainer.insertAdjacentHTML(
            "beforeend",
            `<p>Shipping Cost = Rs. ${shippingCost.toLocaleString()}</p>`
        );

        total += shippingCost;
        totalContainer.textContent = `Total = Rs. ${total.toLocaleString()}`;

        // Add event listeners to "Remove" buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const productIndex = this.getAttribute("data-index");
                products.splice(productIndex, 1); // Remove the product from the array
                displayCart(); // Refresh the cart display
            });
        });
    }

    clearCartButton.addEventListener("click", function () {
        products.length = 0;
        displayCart();
    });

    displayCart();
});
