// ---- CART HANDLING ----

// Load existing cart from localStorage, or empty array if none
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count in header
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Function to add products to cart
function addToCart(name, price) {
  // Check if product already exists
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count instantly
  updateCartCount();

  // Optional animation for feedback
  let cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.style.transform = "scale(1.3)";
    setTimeout(() => (cartCount.style.transform = "scale(1)"), 200);
  }

  alert(`${name} added to cart! 🎁`);
}

// Run once on page load
updateCartCount();


// ---- PRODUCT SEARCH ----

// Function to filter products based on search input
function searchProducts() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const filter = input.value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const title = product.querySelector('h3').innerText.toLowerCase();
    product.style.display = title.includes(filter) ? 'flex' : 'none';
  });
}

// Attach search event listener only if searchInput exists
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('keyup', searchProducts);
}
