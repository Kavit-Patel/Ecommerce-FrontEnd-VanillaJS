export interface productType {
  _id: string;
  name: string;
  price: number;
  image: string;
  section: string;
}
export interface dataType {
  [key: string]: productType[];

  // category: productType[];
  // newArrival: productType[];
  // discounted: productType[];
  // products: productType[];
}
export interface Cart extends productType {
  quantity?: number;
}
