import { dataType, productType } from "../types/types";

export const fetchData = async () => {
  try {
    const request = await fetch(import.meta.env.VITE_API_URL, {
      credentials: "include",
    });
    const prods = await request.json();
    if (prods.success) {
      return prods.response.reduce(
        (acc: dataType, el: productType) => {
          switch (el.section) {
            case "category":
              acc.category.push(el);
              break;
            case "newArrival":
              acc.newArrival.push(el);
              break;

            case "discounted":
              acc.discounted.push(el);
              break;
            case "products":
              acc.products.push(el);
              break;
            default:
              console.log(el);
          }
          return acc;
        },
        { category: [], newArrival: [], discounted: [], products: [] }
      );
    } else {
      return { category: [], newArrival: [], discounted: [], products: [] };
    }
  } catch (error) {
    console.log(error);
    return { category: [], newArrival: [], discounted: [], products: [] };
  }
};
