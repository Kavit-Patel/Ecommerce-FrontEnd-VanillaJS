import { productType } from "../types/types";
import { lsAddItems, lsItems, lsUpdateItems } from "./localStorageAccess";

export const addToCart = (id: string) => {
  let currentItems = lsItems();
  let match = currentItems.find((item: productType) => item._id == id);
  if (!match) {
    lsAddItems(id);
  } else {
    lsUpdateItems(id, "increase");
  }
};
