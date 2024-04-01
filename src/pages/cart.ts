import { pathArr } from "../utilityFunctions/getPath";
import {
  calculateSubTotal,
  fullCartProducts,
  lsRemove,
  lsUpdateItems,
} from "../utilityFunctions/localStorageAccess";
import { fetchData } from "../data/data";
import { Cart } from "../types/types";
// let localCart = lsItems();
document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchData();
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
  fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#footer-placeholder")!.innerHTML = data;
    })
    .catch((err) => console.log(err));

  let url = pathArr();
  let path = document.querySelector(".path");
  url.forEach((element) => {
    let span = document.createElement("span");
    let a = document.createElement("a");
    if (element == "home") {
      a.href = "/";
    } else {
      a.href = "#";
    }
    a.innerText = element;
    a.classList.add("cursor-pointer");
    span.innerText = ">";
    path?.append(a, span);
  });
  let cartContainer = document.querySelector(
    "#cartContainer"
  ) as HTMLDivElement;
  let cartTemplate = document.querySelector(
    "#cartTemplate"
  ) as HTMLTemplateElement;

  let cart: Cart[] = fullCartProducts(data);
  let subtotal = document.querySelector(".subtotal") as HTMLSpanElement;
  let tax = document.querySelector(".tax") as HTMLSpanElement;
  let shipping = document.querySelector(".shipping") as HTMLSpanElement;
  let total = document.querySelector(".total") as HTMLSpanElement;

  cart.forEach((item) => {
    let cartNode = document.importNode(cartTemplate.content, true);
    let card = cartNode.querySelector("#card") as HTMLDivElement;
    let img = cartNode.querySelector("img") as HTMLImageElement;
    let title = cartNode.querySelector(".title") as HTMLSpanElement;
    let id = cartNode.querySelector(".id") as HTMLSpanElement;
    let quantity = cartNode.querySelector(".quantity") as HTMLDivElement;
    let increaseQuantity = cartNode.querySelector(
      ".increaseQuantity"
    ) as HTMLButtonElement;
    let decreaseQuantity = cartNode.querySelector(
      ".decreaseQuantity"
    ) as HTMLButtonElement;
    let price = cartNode.querySelector(".price") as HTMLDivElement;
    let remove = cartNode.querySelector(".remove") as HTMLDivElement;

    if (card) card.setAttribute("id", `${item._id}`);
    if (img) img.src = item.image;
    if (title) title.innerText = item.name;
    if (id) id.innerText = `#${item._id}`;
    if (quantity) quantity.innerText = `${item.quantity}`;
    if (increaseQuantity)
      increaseQuantity.addEventListener("click", () => {
        let latestItem: { id: string; quantity: number } = lsUpdateItems(
          item._id,
          "increase"
        ) || { id: item._id, quantity: item.quantity as number };
        if (quantity && latestItem)
          quantity.innerText = `${latestItem.quantity}`;
        price.innerText = `$${(item.price as number) * latestItem.quantity}`;

        subtotal.innerText = `$${calculateSubTotal(data).calculatedSubTotal}`;
        tax.innerText = `$${calculateSubTotal(data).calculatedTax}`;
        shipping.innerText = `$${calculateSubTotal(data).calculatedShipping}`;
        total.innerText = `$${calculateSubTotal(data).calculatedTotal}`;
      });
    if (decreaseQuantity)
      decreaseQuantity.addEventListener("click", () => {
        let latestItem = lsUpdateItems(item._id, "decrease") || {
          id: +item._id,
          quantity: item.quantity as number,
        };
        if (quantity && +quantity.innerText > 1 && latestItem)
          quantity.innerText = `${latestItem.quantity}`;
        price.innerText = `$${(item.price as number) * latestItem.quantity}`;
        subtotal.innerText = `$${calculateSubTotal(data).calculatedSubTotal}`;
        tax.innerText = `$${calculateSubTotal(data).calculatedTax}`;
        shipping.innerText = `$${calculateSubTotal(data).calculatedShipping}`;
        total.innerText = `$${calculateSubTotal(data).calculatedTotal}`;
      });
    if (price && item.quantity)
      price.innerText = `$${
        ((item.price as number) * item.quantity) as number
      }`;

    if (remove)
      remove.addEventListener("click", () => {
        lsRemove(item._id);
        if (card.getAttribute("id") == `${item._id}`) {
          card.remove();
          subtotal.innerText = `$${calculateSubTotal(data).calculatedSubTotal}`;
          tax.innerText = `$${calculateSubTotal(data).calculatedTax}`;
          shipping.innerText = `$${calculateSubTotal(data).calculatedShipping}`;
          total.innerText = `$${calculateSubTotal(data).calculatedTotal}`;
          const navCartElement = document.querySelector(
            ".navCart"
          ) as HTMLSpanElement;
          if (navCartElement !== null) {
            navCartElement.innerText = fullCartProducts(data).length;
          }
        }
      });
    cartContainer.append(cartNode);
    subtotal.innerText = `$${calculateSubTotal(data).calculatedSubTotal}`;
    tax.innerText = `$${calculateSubTotal(data).calculatedTax}`;
    shipping.innerText = `$${calculateSubTotal(data).calculatedShipping}`;
    total.innerText = `$${calculateSubTotal(data).calculatedTotal}`;
  });
});
