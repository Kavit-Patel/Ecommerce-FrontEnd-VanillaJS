// export const fetchNavbar = () => {
//   fetch("/src/components/navbar.html")
//     .then((response) => response.text())
//     .then((navData) => {
//       return navData;
//     })
//     .catch((error) => console.error("Error loading the navbar:", error));
// };

export const fetchComponents = async (
  url: string,
  selector: string,
  callBack?: () => void
): Promise<void> => {
  const request = await fetch(url);
  const data = await request.text();
  document.querySelectorAll(selector).forEach((element) => {
    element.innerHTML = data;
  });
  if (callBack) callBack();
};
