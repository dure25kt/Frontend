function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

function changeImage(img) {
  document.querySelector(".product-image").src = img.src;
}

<script>
<script>
const row = document.querySelector('.image-row');
const next = document.querySelector('.image-row-slider .next');
const prev = document.querySelector('.image-row-slider .prev');

const cards = document.querySelectorAll('.image-row .product-card');
const cardWidth = 310; // 300px card + 10px margin
let scrollAmount = 0;

next.addEventListener('click', () => {
  scrollAmount += cardWidth;
  // Om vi når slutet, loopa tillbaka till början
  if(scrollAmount > (cards.length - 3) * cardWidth){ 
    // -3 = antal kort synliga åt gången (justera om du visar fler kort)
    scrollAmount = 0;
  }
  row.style.transform = `translateX(-${scrollAmount}px)`;
});

prev.addEventListener('click', () => {
  scrollAmount -= cardWidth;
  if(scrollAmount < 0){
    scrollAmount = (cards.length - 3) * cardWidth; // gå till slutet
  }
  row.style.transform = `translateX(-${scrollAmount}px)`;
});
</script>
