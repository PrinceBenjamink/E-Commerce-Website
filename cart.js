let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function toggleCart() {
    const cartPopup = document.getElementById('cartPopup');
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    renderCart();
}

function addToCart(productName, productPrice, productImage) {
    const item = cartItems.find(item => item.name === productName);
    if (item) {
        item.quantity += 1;
    } else {
        cartItems.push({
            name: productName,
            price: parseFloat(productPrice.replace('Rs.', '')),
            image: productImage,
            quantity: 1
        });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    updateCartCount();
    alert('Item added to cart!');
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cartItems.reduce((count, item) => count + item.quantity, 0);
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p>${item.name}</p>
                <p class="cart-item-price">Rs.${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2); 
}

function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item.name !== productName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    updateCartCount();
    renderCart();
}

document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
        const productDetails = button.closest('.details-right');
        const productName = productDetails.querySelector('.details-name').textContent;
        const productPrice = productDetails.querySelector('.details-price').textContent;
        const productImage = productDetails.previousElementSibling.querySelector('img').src;

        addToCart(productName, productPrice, productImage);
    });
});

updateCartCount();
