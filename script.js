document.addEventListener('DOMContentLoaded', () => {
    let menuItems = [
        {
            id: 1,
            name: 'Nasi Goreng',
            description: 'Nasi goreng dengan ayam, telur, dan sayuran.',
            price: 13000,
            image: 'https://dummyimage.com/150x125/000/fff'
        },
        {
            id: 2,
            name: 'Mie Ayam',
            description: 'Mie dengan potongan ayam, pangsit, dan sayuran.',
            price: 12000,
            image: 'https://dummyimage.com/150x125/000/fff'
        },
        {
            id: 3,
            name: 'Sate Ayam',
            description: 'Sate ayam dengan bumbu kacang.',
            price: 20000,
            image: 'https://dummyimage.com/150x125/000/fff'
        },
        {
            id: 4,
            name: 'Es Teh Manis',
            description: 'Es Teh Segar Manis Enak Sekali.',
            price: 4000,
            image: 'https://dummyimage.com/150x125/000/fff'
        },
        {
            id: 5,
            name: 'Ayam Goreng',
            description: 'Ayam Goreng SiBotak Kembar.',
            price: 15000,
            image: 'https://dummyimage.com/150x125/000/fff'
        },
        {
            id: 6,
            name: 'Pecel Lele',
            description: 'Pecel lele dengan bumbu khas.',
            price: 18000,
            image: 'https://dummyimage.com/150x125/000/fff'
        }
    ];

    let cartItems = [];

    const menuContainer = document.getElementById('menu-container');
    // const menuForm = document.getElementById('menu-form');
    // const menuIdInput = document.getElementById('menu-id');
    // const menuNameInput = document.getElementById('menu-name');
    // const menuDescriptionInput = document.getElementById('menu-description');
    // const menuPriceInput = document.getElementById('menu-price');
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    function renderMenuItems() {
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menu-item');
    
            const nameElement = document.createElement('h2');
            nameElement.textContent = item.name;

            const imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.name;
            imgElement.classList.add('menu-image');
    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = item.description;
    
            const priceElement = document.createElement('p');
            priceElement.classList.add('price');
            priceElement.textContent = `Rp ${item.price}`;
    
            // const deleteButton = document.createElement('button');
            // deleteButton.textContent = 'Delete';
            // deleteButton.onclick = () => deleteMenuItem(item.id);
    
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.onclick = () => addToCart(item.id);
    
            menuItemElement.appendChild(nameElement);
            menuItemElement.appendChild(imgElement);
            menuItemElement.appendChild(descriptionElement);
            menuItemElement.appendChild(priceElement);
            // menuItemElement.appendChild(deleteButton);
            menuItemElement.appendChild(addToCartButton);
    
            menuContainer.appendChild(menuItemElement);
        });
    }
    

    function renderCartItems() {
        cartList.innerHTML = '';
        let totalPrice = 0;
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('li');
    
            const itemDetailsElement = document.createElement('span');
            itemDetailsElement.classList.add('cart-item-details');
            itemDetailsElement.textContent = `${item.name} - Rp ${item.price} x ${item.quantity}`;
    
            const itemActionsElement = document.createElement('span');
            itemActionsElement.classList.add('cart-item-actions');
    
            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.onclick = () => changeQuantity(item.id, 1);
    
            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.onclick = () => changeQuantity(item.id, -1);
    
            itemActionsElement.appendChild(increaseButton);
            itemActionsElement.appendChild(decreaseButton);
    
            cartItemElement.appendChild(itemDetailsElement);
            cartItemElement.appendChild(itemActionsElement);
    
            cartList.appendChild(cartItemElement);
            totalPrice += item.price * item.quantity;
        });
        totalPriceElement.textContent = `Total: Rp ${totalPrice}`;
    }
    

    function addMenuItem(name, description, price) {
        const newItem = {
            id: Date.now(),
            name,
            description,
            price: Number(price)
        };
        menuItems.push(newItem);
        renderMenuItems();
    }

    // function editMenuItem(id) {
    //     const item = menuItems.find(item => item.id === id);
    //     if (item) {
    //         menuIdInput.value = item.id;
    //         menuNameInput.value = item.name;
    //         menuDescriptionInput.value = item.description;
    //         menuPriceInput.value = item.price;
    //     }
    // }

    function updateMenuItem(id, name, description, price) {
        const item = menuItems.find(item => item.id === id);
        if (item) {
            item.name = name;
            item.description = description;
            item.price = Number(price);
            renderMenuItems();
        }
    }

    // function deleteMenuItem(id) {
    //     menuItems = menuItems.filter(item => item.id !== id);
    //     renderMenuItems();
    // }

    function addToCart(id) {
        const item = menuItems.find(item => item.id === id);
        if (item) {
            const cartItem = cartItems.find(cartItem => cartItem.id === id);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cartItems.push({ ...item, quantity: 1 });
            }
            renderCartItems();
        }
    }

    function changeQuantity(id, delta) {
        const cartItem = cartItems.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += delta;
            if (cartItem.quantity === 0) {
                cartItems = cartItems.filter(item => item.id !== id);
            }
            renderCartItems();
        }
    }

    function checkout() {
        if (cartItems.length === 0) {
            alert('Keranjang kosong!');
            return;
        }
        alert('Checkout berhasil!');
        cartItems = [];
        renderCartItems();
    }

    // menuForm.addEventListener('submit', event => {
    //     event.preventDefault();
    //     const id = menuIdInput.value;
    //     const name = menuNameInput.value;
    //     const description = menuDescriptionInput.value;
    //     const price = menuPriceInput.value;

    //     if (id) {
    //         updateMenuItem(Number(id), name, description, price);
    //     } else {
    //         addMenuItem(name, description, price);
    //     }

    //     menuIdInput.value = '';
    //     menuNameInput.value = '';
    //     menuDescriptionInput.value = '';
    //     menuPriceInput.value = '';
    // });

    checkoutButton.addEventListener('click', checkout);

    renderMenuItems();
    renderCartItems();
});
