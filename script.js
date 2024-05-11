const filterButtons = document.querySelectorAll(".third-page-buttons");
const cards = document.querySelectorAll(".third-page .products .content");

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
