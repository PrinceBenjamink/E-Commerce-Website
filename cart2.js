function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContent = document.getElementById('cart-content');
    
    if (cartItems.length === 0) {
        cartContent.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        return;
    }

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    cartItems.forEach((item, index) => {
        tableHTML += `
            <tr>
                <td><img src="${item.image}" alt="${item.name}"> ${item.name}</td>
                <td data-price="${item.price}">Rs. ${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="quantity" style="width: 60px;"></td>
                <td class="item-total">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn-remove" onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
        <div class="total-section" id="subtotal">
            Subtotal: Rs. ${calculateTotal(cartItems).toFixed(2)}
        </div>
    `;

    cartContent.innerHTML = tableHTML;
}

function calculateTotal(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCart();
}

function updateCart() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const quantityInputs = document.querySelectorAll('.quantity');
    
    quantityInputs.forEach((input, index) => {
        cartItems[index].quantity = parseInt(input.value);
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCart();
}

function redirectToPaymentPage() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert("Purchase some products!");
    } else {
        window.location.href = 'payment.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    document.getElementById('updateCart').addEventListener('click', updateCart);
});