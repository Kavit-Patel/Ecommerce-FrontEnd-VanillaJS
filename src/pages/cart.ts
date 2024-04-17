import { pathArr } from "../utilityFunctions/getPath";
import {
  calculateSubTotal,
  fullCartProducts,
  lsItems,
  lsRemove,
  lsUpdateItems,
} from "../utilityFunctions/localStorageAccess";
import { fetchData } from "../data/data";
import { Cart, dataType } from "../types/types";
import { showLoader } from "../utilityFunctions/showLoader";
import { fetchComponents } from "../utilityFunctions/fetchComponents";
import { processNavbar } from "../utilityFunctions/processNavbar";
// let localCart = lsItems();
let data: dataType;
document.addEventListener("DOMContentLoaded", async () => {
  data = await fetchData();
  // showLoader(true);
  try {
    let dataPromise = fetchData();
    await Promise.all([
      fetchComponents(
        "/src/components/navbar.html",
        "#navbar-placeholder",
        () => processNavbar(dataPromise)
      ),
      fetchComponents("/src/components/button.html", ".button"),
      fetchComponents("/src/components/footer.html", ".footer"),
    ]);
    data = await fetchData();
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

    let allProductData = Object.values(data)
      .map((el) => Object.values(el))
      .flat();
    let cart: Cart[] = fullCartProducts(allProductData);
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

          subtotal.innerText = `$${
            calculateSubTotal(allProductData).calculatedSubTotal
          }`;
          tax.innerText = `$${calculateSubTotal(allProductData).calculatedTax}`;
          shipping.innerText = `$${
            calculateSubTotal(allProductData).calculatedShipping
          }`;
          total.innerText = `$${
            calculateSubTotal(allProductData).calculatedTotal
          }`;
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
          subtotal.innerText = `$${
            calculateSubTotal(allProductData).calculatedSubTotal
          }`;
          tax.innerText = `$${calculateSubTotal(allProductData).calculatedTax}`;
          shipping.innerText = `$${
            calculateSubTotal(allProductData).calculatedShipping
          }`;
          total.innerText = `$${
            calculateSubTotal(allProductData).calculatedTotal
          }`;
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
            subtotal.innerText = `$${
              calculateSubTotal(allProductData).calculatedSubTotal
            }`;
            tax.innerText = `$${
              calculateSubTotal(allProductData).calculatedTax
            }`;
            shipping.innerText = `$${
              calculateSubTotal(allProductData).calculatedShipping
            }`;
            total.innerText = `$${
              calculateSubTotal(allProductData).calculatedTotal
            }`;
            const navCartElement = document.querySelector(
              ".navCart"
            ) as HTMLSpanElement;
            if (navCartElement !== null) {
              navCartElement.innerText =
                fullCartProducts(allProductData).length;
            }
          }
        });
      cartContainer.append(cartNode);
      subtotal.innerText = `$${
        calculateSubTotal(allProductData).calculatedSubTotal
      }`;
      tax.innerText = `$${calculateSubTotal(allProductData).calculatedTax}`;
      shipping.innerText = `$${
        calculateSubTotal(allProductData).calculatedShipping
      }`;
      total.innerText = `$${calculateSubTotal(allProductData).calculatedTotal}`;
    });
  } catch (error) {
    console.log(error instanceof Error ? error.message : "Data fetch Failed !");
  } finally {
    showLoader(false);
  }
});
// onclicking page will be redirected to https://ecommerce-react-tau-ten.vercel.app/login for further user interaction
const checOutId = document.getElementById("checkout");
const bounceLoader = document.getElementById("bounceLoader");
if (checOutId) {
  const cartData = encodeURIComponent(JSON.stringify(lsItems()));
  checOutId.addEventListener("click", () => {
    if (bounceLoader) {
      checOutId.querySelector("span")!.innerText = "";
      bounceLoader.style.display = "flex";
    }
    // window.location.href = `http://localhost:5173/login?queryCart=${cartData}`;
    window.location.href = `https://ecommerce-react-tau-ten.vercel.app/login?queryCart=${cartData}`;
  });
}
