# Shopping Cart Backend

A RESTful backend API for a shopping cart application built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**.

The application provides APIs to manage products and shopping cart operations, including adding items, updating quantities, removing products, and clearing the cart.

---

## Features

* Product listing API
* Shopping cart management
* Add product to cart
* Increment and decrement product quantity
* Automatically remove an item when quantity reaches zero
* Remove a specific product from the cart
* Clear the entire cart
* MongoDB integration using Mongoose
* Request validation using Joi
* Centralized error handling
* TypeScript support
* Clean project structure

---

## Tech Stack

* Node.js (v20 or later)
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Joi
* dotenv
* Helmet
* CORS
* Morgan

---

## Project Structure

```text
src
│
├── config
│   └── db.ts
│
├── controllers
│   ├── cartController.ts
│   └── productController.ts
│
├── middleware
│   ├── errorHandler.ts
│   ├── notFound.ts
│   └── validator.ts
│
├── models
│   ├── Cart.ts
│   └── Product.ts
│
├── routes
│   ├── cartRoutes.ts
│   └── productRoutes.ts
│
├── services
│   ├── cartService.ts
│   └── productService.ts
│
├── validators
│   └── cartValidator.ts
│
├── utils
│   ├── ApiResponse.ts
│   ├── asyncHandler.ts
│   └── CustomError.ts
│
├── app.ts
└── server.ts
```

---

## Prerequisites

Make sure the following are installed:

* Node.js v20 or later
* MongoDB
* npm

Verify installation:

```bash
node -v
npm -v
mongod --version
```

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Navigate to the project directory.

```bash
cd shopping-cart-backend
```

Install dependencies.

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopping-cart
```

Adjust the MongoDB connection string if your database is running elsewhere.

---

## Running the Application

Start the development server.

```bash
npm run dev
```

The server will be available at:

```text
http://localhost:5000
```

---

## Build for Production

Compile TypeScript.

```bash
npm run build
```

Start the compiled application.

```bash
npm start
```

---

## API Endpoints

### Products

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/api/products` | Fetch all products |

---

### Cart

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | `/api/cart`            | Get shopping cart               |
| POST   | `/api/cart`            | Add product to cart             |
| PATCH  | `/api/cart/:productId` | Increment or decrement quantity |
| DELETE | `/api/cart/:productId` | Remove a product from the cart  |
| DELETE | `/api/cart`            | Clear all cart items            |

---

## Sample Requests

### Add Product to Cart

**POST** `/api/cart`

```json
{
  "productId": "YOUR_PRODUCT_ID",
  "quantity": 1
}
```

---

### Update Quantity

**PATCH** `/api/cart/:productId`

```json
{
  "action": "increment"
}
```

or

```json
{
  "action": "decrement"
}
```

When the quantity reaches **0**, the product is automatically removed from the cart.

---

## Validation

Request validation is implemented using **Joi**.

Validated inputs include:

* Request body
* Route parameters
* Query parameters (where applicable)

---

## Error Handling

The project includes centralized error handling for:

* Validation errors
* Invalid requests
* Unexpected server errors

All API responses are returned in JSON format.

---

## Example Database Collection

**Cart Model**
{
  "_id": {
    "$oid": "6a49f04ce7d0163b52062395"
  },
  "items": [
    {
      "product": {
        "$oid": "6a49f04ce7d0163b52062392"
      },
      "quantity": 1,
      "_id": {
        "$oid": "6a4a48a086729fd52dbfc982"
      }
    }
  ],
  "createdAt": {
    "$date": "2026-07-05T05:49:00.041Z"
  },
  "updatedAt": {
    "$date": "2026-07-05T12:05:52.852Z"
  },
  "__v": 37
}

**Product Model**

{
  "_id": {
    "$oid": "6a49f04ce7d0163b52062391"
  },
  "name": "Samsung Galaxy S25",
  "image": "https://placehold.co/300x300?text=Samsung",
  "price": 99999,
  "__v": 0,
  "createdAt": {
    "$date": "2026-07-05T05:49:00.030Z"
  },
  "updatedAt": {
    "$date": "2026-07-05T05:49:00.030Z"
  }
}

---