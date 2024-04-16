import { dataType } from "../types/types";
import { fullCartProducts } from "./localStorageAccess";

export const processNavbar = (dataPromise: Promise<dataType>) => {
  dataPromise.then((data) => {
    let allProductData = Object.values(data)
      .flat()
      .map((el) => Object.values(el))
      .flat();
    let cartItems = document.querySelector(".navCart") as HTMLSpanElement;
    if (cartItems)
      cartItems.innerText = fullCartProducts(allProductData).length;
    document
      .querySelector("input")
      ?.addEventListener(
        "focus",
        () => (window.location.href = "/src/pages/products.html")
      );
  });

  // let navbarPlaceholder = document.querySelector("#navbar-placeholder");
  // if (navbarPlaceholder) navbarPlaceholder.innerHTML = productsData;
  let myCart = document.querySelector(".myCart") as HTMLSpanElement;
  let hamburger = document.querySelector(".hamburger") as HTMLParagraphElement;
  let showCart = document.querySelector(".showCart") as HTMLParagraphElement;

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
};
