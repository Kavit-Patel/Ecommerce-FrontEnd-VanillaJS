import { fetchData } from "./data/data";
import { dataType } from "./types/types";
import { fullCartProducts } from "./utilityFunctions/localStorageAccess";

document.addEventListener("DOMContentLoaded", async function () {
  const data: dataType = await fetchData();

  fetch("/src/components/navbar.html")
    .then((response) => response.text())
    .then((navData) => {
      let navbarPlaceholder = document.querySelector("#navbar-placeholder");
      if (navbarPlaceholder) navbarPlaceholder.innerHTML = navData;
      let cartItems = document.querySelector(".navCart") as HTMLSpanElement;
      let myCart = document.querySelector(".myCart") as HTMLSpanElement;
      let hamburger = document.querySelector(
        ".hamburger"
      ) as HTMLParagraphElement;
      let showCart = document.querySelector(
        ".showCart"
      ) as HTMLParagraphElement;

      if (cartItems) cartItems.innerText = fullCartProducts(data).length;
      document
        .querySelector("input")
        ?.addEventListener(
          "focus",
          () => (window.location.href = "/src/pages/products.html")
        );
      if (myCart) {
        myCart.addEventListener(
          "click",
          () => (window.location.href = "/src/pages/cart.html")
        );
      }
      if (hamburger) {
        hamburger.addEventListener("click", () => {
          if (showCart.style.zIndex == "20") {
            showCart.style.zIndex = `-10`;
          } else {
            showCart.style.zIndex = `20`;
          }
        });
      }
    })
    .catch((error) => console.error("Error loading the navbar:", error));
  fetch("/src/components/button.html")
    .then((response) => response.text())
    .then((data) => {
      let button = document.querySelectorAll(".button");
      if (button) button.forEach((e) => (e.innerHTML = data));
    })
    .catch((error) => console.error("Error loading the navbar:", error));

  fetch("/src/components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      let footerPlaceholder = document.querySelectorAll(".footer");
      if (footerPlaceholder)
        footerPlaceholder.forEach((e) => (e.innerHTML = data));
    })
    .catch((error) => console.error("Error loading the navbar:", error));

  let categorySection: HTMLElement = document.querySelector(
    "#categorySection"
  ) as HTMLElement;
  let categoryTemplate: HTMLTemplateElement = document.querySelector(
    "#categoryTemplate"
  ) as HTMLTemplateElement;

  data.category.forEach((product) => {
    let categoryClone = document.importNode(categoryTemplate.content, true);
    let img = categoryClone.querySelector("img");
    if (img) img.src = product.image;
    categorySection?.append(categoryClone);
  });

  let featuredSection = document.querySelector(
    "#featuredSection"
  ) as HTMLElement;
  let featuredTemplate = document.querySelector(
    "#featuredTemplate"
  ) as HTMLTemplateElement;

  data.newArrival.forEach((product) => {
    let featuredNode = document.importNode(featuredTemplate.content, true);
    let img = featuredNode.querySelector("img");
    let name = featuredNode.querySelector("h2");
    let prc = featuredNode.querySelector("p");
    let link = featuredNode.querySelector("a");
    if (img) img.src = product.image;
    if (name) name.innerText = product.name;
    if (prc) prc.innerText = `$${product.price}`;
    if (link)
      link.href = `/src/pages/product.html?type=newArrival&productId=${product._id}`;
    featuredSection.append(featuredNode);
  });

  let discountedSection = document.querySelector(
    "#discountedSection"
  ) as HTMLElement;
  let discountedTemplate = document.querySelector(
    "#discountedTemplate"
  ) as HTMLTemplateElement;

  data.discounted.forEach((product) => {
    let discountedNode = document.importNode(discountedTemplate.content, true);
    let img = discountedNode.querySelector("img");
    let name = discountedNode.querySelector("h2");
    let prc = discountedNode.querySelector("p");
    let link = discountedNode.querySelector("a");
    if (img) img.src = product.image;
    if (name) name.innerText = product.name;
    if (prc) prc.innerText = `$${product.price}`;
    if (link)
      link.href = `/src/pages/product.html?type=discounted&productId=${product._id}`;
    discountedSection.append(discountedNode);
  });
});
