const API_URL = "http://localhost:5000/api/products";

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

let products = [];
let filteredProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    products = await response.json();

    filteredProducts = products;

    renderProducts(filteredProducts);
  } catch (error) {
    console.error(error);
  }
}

function renderProducts(data) {
  productGrid.innerHTML = "";

  data.forEach(product => {
    productGrid.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        
        <div class="card-body">
          <h3>${product.name}</h3>

          <p>${product.category}</p>

          <p class="price">
            Rp ${product.price.toLocaleString()}
          </p>

          <button 
            class="primary"
            onclick='addToCart(${JSON.stringify(product)})'
          >
            Add To Cart
          </button>
        </div>
      </div>
    `;
  });
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      qty:1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.getElementById("cartCount").innerText =
    cart.reduce((acc, item) => acc + item.qty, 0);
}

searchInput.addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();

  filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(keyword)
  );

  renderProducts(filteredProducts);
});

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {

    const category = button.dataset.category;

    if(category === "all"){
      filteredProducts = products;
    }else{
      filteredProducts = products.filter(
        product => product.category === category
      );
    }

    renderProducts(filteredProducts);
  });
});

fetchProducts();
updateCartCount();
