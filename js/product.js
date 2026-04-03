const userProductBox = document.querySelector('.container-box');
let items = JSON.parse(localStorage.getItem('items')) || [];
const totalPrice = document.getElementById('totalPrice');
const favBox = document.querySelector('.swiper-wrapper')
let favItems = JSON.parse(localStorage.getItem('favourite'))


function drawUserProduct() {
    userProductBox.innerHTML = ''
    for (let i in items) {

        userProductBox.innerHTML += `
            <div class="cart-item">
    <div class="cart-item-img">
        <img src="${items[i].img}" alt="${items[i].name}">
    </div>
    <div class="cart-item-info">
        <h4 class="cart-item-name">${items[i].name}</h4>
        <span class="cart-item-category">${items[i].category}</span>
        <div class="cart-item-price">${items[i].price}</div>
        <div class="cart-item-controls">
            <div class="qty-box plus">
                <button class="qty-btn minus-btn" onclick="minusBtn(${items[i].id})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="qty-count">${items[i].count}</span>
                <button class="qty-btn plus-btn" onclick="plusBtn(${items[i].id})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button class="remove-btn" onclick="removeItems(${items[i].id})">
                <i class="fas fa-trash-alt"></i> Remove
            </button>
        </div>
    </div>
</div>
<!-- End of elemant -->
        `
    }
}
drawUserProduct()

function getTotalPrice() {
    let sum = 0;
    let prices = items.map((ele) => {
        let price = ele.price.split(' ')
        return parseInt(price[0]);
    })
    for (let i in items) {
    sum += prices[i] * parseInt(items[i].count)  // ✅ use prices[i] not prices[0]
}
    totalPrice.innerHTML = sum + '$';
}
getTotalPrice()

function removeItems(id) {
    var index = items.findIndex((x) => {
        return x.id == id
    })
    items.splice(index, 1)
    localStorage.setItem('items', JSON.stringify(items))
    console.log(items);
    drawUserProduct()
    getTotalPrice()
}
function plusBtn(id, e) {
    ele = items.find((x) => {
        return x.id == id
    })
    ele.count++;
    localStorage.setItem('items', JSON.stringify(items))
    drawUserProduct()
    getTotalPrice()
}

function minusBtn(id) {
    ele = items.find((x) => {
        return x.id == id
    })
    if (ele.count != 1) {
        ele.count--;
        localStorage.setItem('items', JSON.stringify(items))
        drawUserProduct()
        getTotalPrice()
    } else {
        let index = items.indexOf(ele)
        items.splice(index, 1)
        localStorage.setItem('items', JSON.stringify(items))
        drawUserProduct()
        getTotalPrice()
    }
}

function drawFav() {
    favBox.innerHTML = '';
    for (let i in favItems) {
        favBox.innerHTML += `
<div class="swiper-slide">
    <div class="fav-card">
        <div class="fav-card-img">
            <img src="${favItems[i].img}" alt="${favItems[i].name}">
        </div>
        <div class="fav-card-body">
            <h5 class="fav-name">${favItems[i].name}</h5>
            <span class="fav-category">${favItems[i].category}</span>
            <button class="fav-remove-btn" onclick="removeFavourite(${favItems[i].id})">
                <i class="fas fa-heart"></i> Remove from Favourites
            </button>
        </div>
    </div>
</div>
        `
    }
}
drawFav()

function removeFavourite(id) {
    let index = favItems.findIndex((x) => {
        return x.id == id
    })

    favItems.splice(index, 1)
    localStorage.setItem('favourite', JSON.stringify(favItems))
    console.log(favItems)

    addEventListener('click', (e) => e.preventDefault())
    location.reload()
    drawFav()
}

function size() {
    let width;
    if (window.innerWidth >= 993) {
        width = 3
    } else if (window.innerWidth >= 560) {
        width = 2
    } else {
        width = 1
    }
    var swiper = new Swiper(".mySwiper", {

        slidesPerView: width,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}
size()

let minus = document.querySelectorAll('.fa-minus')
let plus = document.querySelectorAll('.plus')
console.log(minus, plus)

minus.forEach(ele => {
    ele.addEventListener('click', (e) => {
        e.preventDefault();
    })
})
plus.forEach(ele => {
    ele.addEventListener('click', (e) => {
        e.preventDefault();
    })
})


