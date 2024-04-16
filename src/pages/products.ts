import { fetchData } from "../data/data";
import { dataType, productType } from "../types/types";
// import data from "../data/data.json";
import { pathArr } from "../utilityFunctions/getPath";
import { fullCartProducts } from "../utilityFunctions/localStorageAccess";

document.addEventListener("DOMContentLoaded", async () => {
  let navSearch: HTMLInputElement;
  fetch("../components/navbar.html")
    .then((response) => response.text())
    .then((navData) => {
      let navbarPlaceholder = document.querySelector("#navbar-placeholder");

      if (navbarPlaceholder) navbarPlaceholder.innerHTML = navData;
      // let cartItems = document.querySelector(".navCart") as HTMLSpanElement;

      // if (cartItems) cartItems.innerText = fullCartProducts(data).length;

      let myCart = document.querySelector(".myCart") as HTMLSpanElement;
      fetchData().then((data: dataType) => {
        let cartItems = document.querySelector(".navCart") as HTMLSpanElement;
        const productsArr = Object.values(data).flat();
        if (cartItems)
          cartItems.innerText = fullCartProducts(productsArr).length;
      });
      let hamburger = document.querySelector(
        ".hamburger"
      ) as HTMLParagraphElement;
      let showCart = document.querySelector(
        ".showCart"
      ) as HTMLParagraphElement;
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

      navSearch = document.querySelector("input") as HTMLInputElement;
      navSearch.focus();
      if (navSearch !== undefined) {
        navSearch.addEventListener("input", (e) => {
          let target = e.target as HTMLInputElement;
          let searchedProduct = target.value;
          let newProducts = products.filter((product) => {
            return product.name
              .toLowerCase()
              .includes(searchedProduct.toLowerCase());
          });
          productSection.innerHTML = "";
          newProducts.forEach((product) => {
            let productNode = document.importNode(
              productTemplate.content,
              true
            );
            let img = productNode.querySelector("img");
            let name = productNode.querySelector("h2");
            let prc = productNode.querySelector("p");
            let link = productNode.querySelector("a");

            if (img) img.src = product.image;

            if (name) name.innerText = product.name;
            if (prc) prc.innerText = `${product.price}`;
            if (link)
              link.href = `/src/pages/product.html?type=products&productId=${product._id}`;
            productSection.append(productNode);
          });
        });
      }
    });
  fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      let footerPlaceholder = document.querySelector("#footer-placeholder");
      if (footerPlaceholder) footerPlaceholder.innerHTML = data;
    });

  let path = document.querySelector(".path");
  let address = pathArr();
  let productSection = document.querySelector("#productSection") as HTMLElement;
  let productTemplate = document.querySelector(
    "#productTemplate"
  ) as HTMLTemplateElement;
  address.forEach((el) => {
    let a = document.createElement("a");
    let span = document.createElement("span");
    span.innerText = ">";
    // span.classList.add("px-4", "text-gray-500");
    a.href = el == "home" ? "/" : el == "products" ? `${el}.html` : "#";
    a.innerText = el;
    // a.classList.add("text-xl", "text-gray-500", "cursor-pointer");

    if (path) path.append(a, span);
  });
  const data = await fetchData();
  let products: productType[] = data.products;
  let sortedProductPriceArr: number[] = products
    .map((e: productType) => e.price)
    .sort((a: number, b: number) => b - a);
  let minProductPrice = sortedProductPriceArr.at(-1);
  let maxProductPrice = sortedProductPriceArr[0];
  let range = document.querySelector("#priceRange") as HTMLInputElement;
  let minRange = document.querySelector(".minimum") as HTMLElement;
  let maxRange = document.querySelector(".maximum") as HTMLElement;
  range.min = minProductPrice ? `${minProductPrice}` : "0";
  range.max = maxProductPrice ? `${maxProductPrice}` : "0";
  minRange.innerText = range.min;
  maxRange.innerText = range.max;
  range.value = `${maxProductPrice}`;
  // val.innerText = range.value;
  // range.max = `${maxProductPrice}`;

  range.addEventListener("input", () => {
    maxRange.innerText = range.value;
    let newProducts = products.filter(
      (element) => element.price <= +range.value
    );
    productSection.innerHTML = "";

    newProducts.forEach((product) => {
      let productNode = document.importNode(productTemplate.content, true);
      let img = productNode.querySelector("img");
      let name = productNode.querySelector("h2");
      let prc = productNode.querySelector("p");
      let link = productNode.querySelector("a");

      if (img) img.src = product.image;

      if (name) name.innerText = product.name;
      if (prc) prc.innerText = `${product.price}`;
      if (link)
        link.href = `/src/pages/product.html?type=products&productId=${product._id}`;
      productSection.append(productNode);
    });
  });
  products.forEach((product) => {
    let productNode = document.importNode(productTemplate.content, true);
    let img = productNode.querySelector("img");
    let name = productNode.querySelector("h2");
    let prc = productNode.querySelector("p");
    let link = productNode.querySelector("a");
    if (img) img.src = product.image;
    if (name) name.innerText = product.name;
    if (prc) prc.innerText = `${product.price}`;
    if (link)
      link.href = `/src/pages/product.html?type=products&productId=${product._id}`;
    productSection.append(productNode);
  });
});
