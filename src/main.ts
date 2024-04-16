import { fetchData } from "./data/data";
import { dataType } from "./types/types";
import { fetchComponents } from "./utilityFunctions/fetchComponents";
// import { fullCartProducts } from "./utilityFunctions/localStorageAccess";
import { processNavbar } from "./utilityFunctions/processNavbar";
import { showLoader } from "./utilityFunctions/showLoader";

// let dataPromise: dataType;
document.addEventListener("DOMContentLoaded", async function () {
  let dataPromise = fetchData();
  // showLoader(true);
  try {
    await Promise.all([
      fetchComponents(
        "/src/components/navbar.html",
        "#navbar-placeholder",
        () => processNavbar(dataPromise)
      ),
      fetchComponents("/src/components/button.html", ".button"),
      fetchComponents("/src/components/footer.html", ".footer"),
    ]);
    const data: dataType = await dataPromise;
    let categorySection: HTMLElement = document.querySelector(
      "#categorySection"
    ) as HTMLElement;
    let categoryTemplate: HTMLTemplateElement = document.querySelector(
      "#categoryTemplate"
    ) as HTMLTemplateElement;
    // ----------------------------------------------------------------------------------------------------
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
      let discountedNode = document.importNode(
        discountedTemplate.content,
        true
      );
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
  } catch (error) {
    console.log(error instanceof Error ? error.message : "Data fetch Failed !");
  } finally {
    showLoader(false);
  }
});
