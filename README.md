# Ecommerce-FrontEnd-VanillaJS-TYPESCRIPT with MongoDB Cloud for product fetching.

## Deployment

- FRONT_END of this website is already deployed and can be accessed here:
  [Live Demo]("https://ecommerce-front-end-vanilla-js.vercel.app")
- BACK_END website is deployed and can be accessed here:
  [Live Demo]("https://ecom-backend-9pyi.onrender.com")

**In This VanillaJs frontend("https://ecommerce-front-end-vanilla-js.vercel.app"), as soon as user clicks on cart's CheckOut button , it will redirect user with user's cart items , to react frontend's (https://ecommerce-react-tau-ten.vercel.app/login) login page, User should login or create account there and his cart items will show in cart as it is.Further Payment can be done after that.**

This project is a basic e-commerce website that demonstrates the use of TypeScript, VanillaJS,TailwindCss. It includes features like product listing, Product Filtering, cart functionality(CRUD) in local storage .

## Tech Stack

- **Frontend**:
  - Vanilla JS
  - TypeScript
  - Tailwind CSS
- **Backend**:
  - MongoDB Cloud (for storing product data)

## Features

1. **Product Listing**: Fetches all products from the MongoDB Cloud database.
2. **Cart Functionality**:
   - Users can add products to their cart.
   - Cart data is saved in local storage.
3. **Search and Filtering**:
   - Users can search for products by name.
   - Filter products by price.

## Getting Started

1. Clone this repository.
2. cd/Ecommerce-FrontEnd-VanillaJS
3. Create .env file in Root and add VITE_API_URL = https://ecom-backend-9pyi.onrender.com
4. Install dependencies: `npm install`
5. Run the project: `npm run dev`
