const products = [
    { id: 1, name: "Luxury Watch", price: 299, category: "watch", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49" },
    { id: 2, name: "Headphones", price: 199, category: "tech", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
    { id: 3, name: "Sneakers", price: 149, category: "fashion", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("grid");

function render(list) {
    grid.innerHTML = "";
    list.forEach(p => {
        grid.innerHTML += `
    <div class="card">
    <img src="${p.img}">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>
    <button onclick="add(${p.id})">Add to Cart</button>
    </div>
    `;
    });
}

render(products);

function add(id) {
    let item = products.find(p => p.id === id);
    let exist = cart.find(c => c.id === id);

    if (exist) exist.qty++;
    else cart.push({ ...item, qty: 1 });

    save();
    update();
}

function save() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function update() {
    document.getElementById("cartCount").innerText =
        cart.reduce((a, b) => a + b.qty, 0);
}

update();

/* CART */
const cartBox = document.getElementById("cart");
const overlay = document.getElementById("overlay");

document.querySelector(".cart-btn").onclick = openCart;

function openCart() {
    cartBox.classList.add("open");
    overlay.classList.add("show");
    drawCart();
}

function closeCart() {
    cartBox.classList.remove("open");
    overlay.classList.remove("show");
}

function drawCart() {
    let box = document.getElementById("cartItems");
    let total = 0;

    box.innerHTML = "";

    cart.forEach(c => {
        total += c.price * c.qty;

        box.innerHTML += `
    <p>${c.name} x ${c.qty}</p>
    `;
    });

    document.getElementById("total").innerText = total;
}

/* FILTER */
document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.onclick = () => {
        let f = btn.dataset.filter;
        if (f === "all") render(products);
        else render(products.filter(p => p.category === f));
    };
});

/* SEARCH */
document.getElementById("search").oninput = (e) => {
    render(products.filter(p =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
};

/* THEME */
document.getElementById("theme").onclick = () => {
    document.body.classList.toggle("dark");
};