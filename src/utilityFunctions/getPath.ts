export const pathArr = () => {
  let address = window.location.href.split("/");

  if (address.includes("src")) {
    let consider: boolean = false;
    address = address
      .filter((el) => {
        if (el == "src" || consider) {
          consider = true;
          return true;
        }
      })
      .map((el) => {
        if (el == "src") {
          return "home";
        } else if (el.includes(".html")) {
          return el.slice(0, -5);
        }
        return el;
      });
  }
  return address;
};
