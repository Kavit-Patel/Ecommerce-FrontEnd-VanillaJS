// import data from "../data/data.json";
import { fetchData } from "../data/data";
import { dataType, productType } from "../types/types";
import { addToCart } from "../utilityFunctions/cartOperation";
import { fullCartProducts } from "../utilityFunctions/localStorageAccess";

document.addEventListener("DOMContentLoaded", async () => {
  const products: dataType = await fetchData();
  // let products:productType = data ;
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

      if (cartItems) cartItems.innerText = fullCartProducts(products).length;
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
    });
  let url = window.location.href;
  let urlParams = new URLSearchParams(new URL(url).search);
  let type = urlParams.get("type") as string;
  let id = urlParams.get("productId") as string;
  let item = products[type].find(
    (product: productType) => product._id == id
  ) as productType;
  let consider: boolean = false;
  let urlArr = url
    .split("/")
    .filter((el) => {
      if (el === "src" || consider) {
        consider = true;
        return true;
      }
    })
    .map((el) => {
      if (el === "src") {
        return "home";
      } else if (el.includes(".html")) {
        return el.split(".html")[0];
      }
      return el;
    });

  let path = document.querySelector(".path") as HTMLElement;
  urlArr.forEach((el) => {
    let span = document.createElement("span");
    let a = document.createElement("a");
    if (el === "home") {
      a.href = `/`;
    } else {
      a.href = "#";
    }
    a.innerText = el;
    if (el === item.name) a.classList.add("font-semibold", "text-gray-800");
    span.innerText = ">";
    path.append(a, span);
  });
  let image = document.querySelector("img") as HTMLImageElement;
  // let productDetail = document.querySelector(".productDetail") as HTMLElement;
  image.src = item.image;
  (document.querySelector(".title") as HTMLElement).innerText = item.name;
  (
    document.querySelector(".price") as HTMLElement
  ).innerText = `$${item.price}`;
  (document.querySelector(".subPrice") as HTMLElement).innerText = `$${(
    (item.price as number) +
    ((item.price as number) / 100) * 25
  ).toFixed(2)}`;
  let color = document.querySelector(".selectColor") as HTMLElement;
  ["#000000", "#781DBC", "#E10000", "#E1B000", "#E8E8E8"].forEach((el) => {
    let a = document.createElement("a");
    a.style.backgroundColor = el;
    a.style.width = "18px";
    a.style.height = "18px";
    a.style.borderRadius = "50%";
    a.href = "#";

    color.append(a);
  });
  let memory = document.querySelector(".memory") as HTMLElement;
  ["128GB", "256GB", "512GB", "1TB"].forEach((el) => {
    let a = document.createElement("a");
    a.innerText = el;
    a.style.border = "1px solid gray";
    a.style.width = "80px";
    a.style.height = "40px";
    a.style.display = "flex";
    a.style.justifyContent = "center";
    a.style.alignItems = "center";
    a.style.padding = "3px 8px";
    a.style.color = "gray";
    a.style.borderRadius = "4px";
    a.href = "#";
    memory.append(a);
  });
  let specification = document.querySelector(".specification") as HTMLElement;
  [
    { name: "Screen size", spec: '5.7"', image: "../../images/screensize.png" },
    { name: "CPU", spec: "Apple A16 Bionic", image: "../../images/chip.png" },
    { name: "Number of Cores", spec: "6", image: "../../images/core.png" },
    {
      name: "Main camera",
      spec: "48-12-12 MP",
      image: "../../images/backCamera.png",
    },
    {
      name: "Front camera",
      spec: "12 MP",
      image: "../../images/frontCamera.png",
    },
    {
      name: "Battery capacity",
      spec: "4323 mAh",
      image: "../../images/battery.png",
    },
  ].forEach((element) => {
    let div = document.createElement("div") as HTMLDivElement;
    let innerDiv = document.createElement("div") as HTMLDivElement;
    let img = document.createElement("img") as HTMLImageElement;
    let innerMostDiv = document.createElement("div") as HTMLDivElement;
    let p1 = document.createElement("p") as HTMLParagraphElement;
    let p2 = document.createElement("p") as HTMLParagraphElement;

    div.style.width = "150px";
    div.style.height = "70px";
    div.style.backgroundColor = "#dedede";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.fontSize = "11px";
    div.style.color = "dark-gray";
    innerDiv.style.display = "flex";
    innerDiv.style.justifyContent = "center";
    innerDiv.style.alignItems = "center";
    innerDiv.style.gap = "10px";

    img.src = element.image;
    p1.innerText = element.name;
    p2.innerText = element.spec;
    innerMostDiv.append(p1, p2);
    innerDiv.append(img, innerMostDiv);
    div.append(innerDiv);
    specification.append(div);
  });
  document.querySelector(".addToCart")?.addEventListener("click", () => {
    // e.preventDefault();
    addToCart(id);
  });
});
