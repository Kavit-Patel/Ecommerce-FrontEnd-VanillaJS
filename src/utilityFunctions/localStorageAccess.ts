import { dataType, Cart } from "../types/types";

export interface cartProducts {
  _id: string;
  quantity: number;
}

export const lsItems = () => {
  return JSON.parse(localStorage.getItem("ecomCart") || "[]");
};
export const lsAddItems = (id: string) => {
  let newItem = { _id: id, quantity: 1 };
  let updatedCart = [...lsItems(), newItem];
  localStorage.setItem("ecomCart", JSON.stringify(updatedCart));
};
export const lsUpdateItems = (id: string, operation: string) => {
  let thisItem;
  let updatedCart = lsItems().map((item: cartProducts) => {
    if (item._id == id) {
      item.quantity =
        operation == "increase"
          ? item.quantity + 1
          : operation == "decrease" && item.quantity > 1
          ? item.quantity - 1
          : item.quantity;
      thisItem = item;
    }
    return item;
  });
  localStorage.setItem("ecomCart", JSON.stringify(updatedCart));
  return thisItem;
};
export const lsRemove = (id: string) => {
  let currentCart = lsItems();
  let index = currentCart.findIndex((item: cartProducts) => item._id == id);
  currentCart.splice(index, 1);
  localStorage.setItem("ecomCart", JSON.stringify(currentCart));
  return currentCart;
};

export function fullCartProducts(data: dataType) {
  return lsItems().map((item: cartProducts) => {
    let match = data.products.find((el) => el._id == item._id);
    return { ...match, quantity: item.quantity };
  });
}

export function calculateSubTotal(data: dataType) {
  let calculatedSubTotal: number =
    fullCartProducts(data).reduce((acc: number, el: Cart) => {
      if (el.price && el.quantity) {
        return acc + el.price * el.quantity;
      } else {
        return acc;
      }
    }, 0) || 0;
  let calculatedTax =
    calculatedSubTotal > 8000
      ? ((calculatedSubTotal / 100) * 12).toFixed(0)
      : calculatedSubTotal == 0
      ? 0
      : 150;
  let calculatedShipping =
    calculatedSubTotal > 400 ? 49 : calculatedSubTotal == 0 ? 0 : 99;
  let calculatedTotal =
    calculatedSubTotal + +calculatedTax + calculatedShipping;
  return {
    calculatedSubTotal,
    calculatedTax,
    calculatedShipping,
    calculatedTotal,
  };
}
