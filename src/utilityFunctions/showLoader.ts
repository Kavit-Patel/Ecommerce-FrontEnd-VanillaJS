export function showLoader(show: boolean) {
  const loader = document.querySelectorAll(".loader");
  if (loader) {
    Array.from(loader).forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.display = show ? "flex" : "none";
    });
  }
}
