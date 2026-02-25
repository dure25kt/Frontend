// Hämta kundvagnen eller skapa en tom lista
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// FUNKTION FÖR ATT LÄGGA TILL
function addToCart(name, price, image) {
  // Hindra eventuella länkar från att laddas om (viktigt!)
  if (event) event.preventDefault();

  const existingProduct = cart.find((item) => item.name === name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " har lagts till!");
}

// UPPDATERA SIFFRAN VID IKONEN
function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = totalQuantity;
  }
}

// VISA VARORNA PÅ CART.HTML
function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} SEK (x${item.quantity})</p>
          <button onclick="removeItem(${index})">Ta bort</button>
        </div>
      </div>
    `;
  });

  if (totalElement) totalElement.textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// KÖR NÄR SIDAN ÖPPNAS
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  console.log("Försöker lägga till:", name); // Denna rad hjälper dig att se om klicket funkar!

  const existingProduct = cart.find((item) => item.name === name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // Öppna sidomenyn automatiskt så användaren ser att det funkade
  document.body.classList.add("showCart");
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = total;
  }
}

// Hantera öppna/stäng av kundvagnen (sidopanelen)
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const iconCart = document.querySelector(".cart-icon");
  const closeBtn = document.querySelector(".close");

  if (iconCart) {
    iconCart.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.toggle("showCart");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.body.classList.remove("showCart");
    });
  }
});
