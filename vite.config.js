import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "./src/pages/products.html"),
        product: resolve(__dirname, "./src/pages/product.html"),
        cart: resolve(__dirname, "./src/pages/cart.html"),
        header: resolve(__dirname, "./src/components/navbar.html"),
        footer: resolve(__dirname, "./src/components/footer.html"),
        button: resolve(__dirname, "./src/components/button.html"),
      },
    },
  },
});
