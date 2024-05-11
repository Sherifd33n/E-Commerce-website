const filterButtons = document.querySelectorAll(".product-button");
const cards = document.querySelectorAll(".products .left .item");

const filterCards = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  cards.forEach((card) => {
    card.classList.add("hide");

    if (
      card.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      card.classList.remove("hide");
    }
  });
};

filterButtons.forEach((button) =>
  button.addEventListener("click", filterCards)
);

//  <=============== ===============>

const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".cart-close");

cartBtn.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

function start() {
  addEvents();
}

function update() {
  addEvents();
  updateTotal();
}

function addEvents() {
  // remove items from cart
  let cartRemoveBtn = document.querySelectorAll(".cart-remove");
  cartRemoveBtn.forEach((btn) => {
    btn.addEventListener("click", removeCartItem);
  });

  // change item quantity
  let cartQuantity = document.querySelectorAll(".cart-quantity");
  cartQuantity.forEach((input) => {
    input.addEventListener("change", changeItemQuantity);
  });

  // add item item cart
  let addToCartBtn = document.querySelectorAll(".addCart");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", addCartItem);
  });

  // order event
  const orderBtn = document.querySelector(".btn-buy");
  orderBtn.addEventListener("click", buyOrder);
}

// handle events

let itemsAdded = [];

function addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".price-product").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;

  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // already existed item
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Added!!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newMode = document.createElement("div");
  newMode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newMode);

  update();
}

function removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter((el) => el.title);

  update();
}

function changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value);

  update();
}

function buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("Your Cart Is Empty!! \nPlease Choose A Product First");
    return;
  }

  const contentCart = cart.querySelector(".cart-content");
  contentCart.innerHTML = "";
  alert("Your Order Is Placed Successfully :)");
  itemsAdded = [];

  update();
}

// update

function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-item");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".price-product");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // to keep 2 digits
  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}

// HTML components
function CartBoxComponent(title, price, imgSrc) {
  return `
  <div class="item cart-item">
    <img src=${imgSrc}
    class="cart-img" />

    <div>
      <h2 class="cart-product-title">${title}</h2>
      <div class="price-product">${price}</div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <img
    src="../images/icons/trash-solid.svg"
    class="cart-remove"
    />
  </div>
  `;
}

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const navList = document.querySelectorAll(".nav-menu li a");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  navList.forEach((list) => {
    list.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });
});
