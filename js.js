let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: 'Kolacic',
        tag: 'kolacic',
        price: 15,
        inCart: 0
    },
    {
        name: 'Vino',
        tag: 'vino',
        price: 16,
        inCart: 0
    },
    {
        name: 'Voce',
        tag: 'voce',
        price: 17,
        inCart: 0
    },
    {
        name: 'Ara',
        tag: 'ara',
        price: 20,
        inCart: 0
    },
    {
        name: 'Jakna',
        tag: 'jakna',
        price: 21,
        inCart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        console.log('dodaj');
        cartNumbers(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {

        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    cartCost = JSON.parse(cartCost);

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <span class="far fa-window-close"></span>
            <img src="./images/${item.tag}.png">
            <span class="name">${item.name}</span>
            
            <div class="price">$${item.price}</div>
            <div class="quantity">
            <span class="far fa-arrow-alt-circle-left"></span>
            <span>${item.inCart}</span>
            <span class="far fa-arrow-alt-circle-right"></span>
            </div>
            <div class="total">
            $${item.inCart * item.price}
            </div>
            
            `;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total
        </h4>
        <h4 class="basketTotal">
        $${cartCost}
        </h4>
        </div>
        `;
    }

}

onLoadCartNumbers();
displayCart();