// get the cart from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function to add a product to the cart
function addToCart(name, price, image) {
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

  //save the updated cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  //update cart icon count
  updateCartCount();
  alert(name + " has been added!");
}

// update cart count
function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    //calcutale total quantity of items
    // the use of reduce was helped by a Youtube tutorial
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = totalQuantity;
  }
}

// the items display on the cart page
function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    //calculate total price
    total += item.price * item.quantity;

    //add to html for each item
    // the html temple below in the lines 57-65 was adapted of Ai
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

// remove an item from the cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// run when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});

//image slider
// the lines 88-110 was adapated of AI
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".image-row");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (!slider || !prevBtn || !nextBtn) return;

  const scrollAmount = 300; //how far you can click after each click

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });
});
