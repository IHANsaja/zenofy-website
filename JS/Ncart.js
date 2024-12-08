document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { productsID: "pro0001", id: "MA1107", name: "Screen - MA1107", description: "Screen suitable for medium scale classes", size: "113 x 113", price: 100000, quantity: 1, image: "assets/logo.jpg" },
        { productsID: "pro0002", id: "MA1108", name: "Screen - MA1108", description: "Screen suitable for medium scale classes", size: "223 x 223", price: 200000, quantity: 2, image: "assets/logo.jpg" },
    ];

    const cartItemsContainer = document.querySelector(".cartitems");
    const summaryContainer = document.querySelector(".sumproducts");
    const totalContainer = document.querySelector(".total");
    const shippingCost = 10000;

    function displayCart() {
        cartItemsContainer.innerHTML = "";
        summaryContainer.innerHTML = "";

        let total = 0;

        products.forEach(product => {
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
                        <button id="${product.productsID}">Remove</button>
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
    }

    displayCart();
});
