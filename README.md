# Craftify Documentation
# Table of Contents
- [Getting Started](#getting-started)
- [Databse Schema](#database-schema)
    1. [Users](#1-users-table)
    1. [Products](#2-products-table)
    1. [Orders](#3-orders-table)
    1. [Orders_Products](#4-orders_products-table)
- [API Documentation](#api-documentation)
    - [Authentication](#authentication-through-json-web-tokens)
    - [General Return Schema](#general-return-schema)
    - [API Base URL](#api-base-url-on-localhost)
    - [Endpoints](#endpoints)
        1. [Users Endpoints](#users-endpoints)
            1. [GET /users/me](#get-usersme)
            1. [POST /users/register](#post-usersregister)
            1. [POST /users/login](#post-userslogin)
            1. [GET /users (Admin Only)](#get-users-admin-only)
            1. [GET /users/:userId (Admin Only)](#get-usersuserid-admin-only)
            1. [PUT /users/:userId (Admin Only)](#put-usersuserid-admin-only)
        1. [Products Endpoints](#products-endpoints)
            1. [GET /products](#get-products)
            1. [GET /products/:productId](#get-productsproductid)
            1. [POST /products (Admin Only)](#post-products-admin-only)
            1. [PUT /products/:productId (Admin Only)](#put-productsproductid-admin-only)
            1. [DELETE /products/:productId (Admin Only)](#delete-productsproductid-admin-only)

# Getting Started
1. Move into an empty directory where you want the code to clone:
```
cd /directory_name
```

2. Git clone the repository into the directory you just created:

For SSH: 
```
git clone git@github.com:2309-te4m-supreme/Craftify.git
```

For HTTPS:
```
https://github.com/2309-te4m-supreme/Craftify.git
```

3. Move into newly created folder and install packages

```bash
cd Craftify
npm i
```

4. Add a `.env` file with your secret value for auth
```
JWT_SECRET='craftopia'
```

5. Create the database

```bash
createdb craftify
```

7. Seed the database
```bash
npm run seed
```

8. Start the server
```bash
npm run dev
```

9. Open your browser at `http://localhost:3000`

10. Build something cool! 😎

[Back to Top](#craftify-documentation)
# Database Schema
## 1. Users Table
The `users` table stores information about the registered users of the eCommerce app. It typically includes fields such as:

| Field Name | Data Type | Description |
|---|---|---|
| user_id | INT | Unique identifier for each user |
| permissions | ENUM | User's permission level (Admin, User, etc.)
| username | VARCHAR(255) | User's chosen username for login purposes |
| email | VARCHAR(255) | User's email address |
| password | VARCHAR(255) | User's password, securely stored using hashing techniques |
| first_name | VARCHAR(255) | User's first name |
| last_name | VARCHAR(255) | User's last name |
| address | VARCHAR(255) | User's physical address for order delivery |
| phone_number | VARCHAR(255) | User's contact phone number |

[Back to Top](#craftify-documentation)
## 2. Products Table
The `products` table maintains details about the products offered in the eCommerce store. It typically includes fields such as:

| Field Name | Data Type | Description |
|---|---|---|
| product_id | INT | Unique identifier for each product |
| product_name | VARCHAR(255) | Name of the product |
| product_description | TEXT | Detailed description of the product |
| product_price | DECIMAL(10,2) | Price of the product |
| product_image | VARCHAR(255) | Reference to the product's image file |
| product_category | VARCHAR(255) | Category to which the product belongs |
| product_stock | INT | Current stock availability for the product |

[Back to Top](#craftify-documentation)
## 3. Orders Table
The `orders` table tracks orders placed by users. It typically includes fields such as:

| Field Name | Data Type | Description |
|---|---|---|
| order_id | INT | Unique identifier for each order |
| user_id | INT | Foreign key referencing the `user_id` in the `users` table, indicating the user who placed the order |
| order_date | DATETIME | Date and time when the order was placed |
| order_status | VARCHAR(255) | Current status of the order, such as "open" or "completed" |
| order_total | DECIMAL(10,2) | Total amount of the order, including product prices and any applicable taxes or shipping costs |

[Back to Top](#craftify-documentation)
## 4. Orders_Products Table
The `orders_products` table serves as a junction table, linking orders to the products included in those orders. It typically includes fields such as:

| Field Name | Data Type | Description |
|---|---|---|
| order_id | INT | Foreign key referencing the `order_id` in the `orders` table, indicating the order to which the product belongs |
| product_id | INT | Foreign key referencing the `product_id` in the `products` table, indicating the product associated with the order |
| quantity | INT | Number of units of the product purchased in that order |

[Back to Top](#craftify-documentation)
# API Documentation
## Authentication through JSON Web Tokens
When using the API, many calls are made in the context of a registered user. The API protects itself by requiring a token string passed in the Header for requests made in that context.

A sample request with an authorization token looks like this:

```js
fetch('/api/reservations', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TOKEN_STRING_HERE'
    },
    body: JSON.stringify({ /* whatever things you need to send to the API */ })
    })
```

It is crucial that the value for Authorization is a string starting with Bearer, followed by a space, and finished with the token you receive either by registering or logging in. Deviating from this format will cause the API to not recognize the token, and will result in an error.

If the token is malformed, missing, or has been revoked, you will get a response specific to that.

```js
{
    "name": "MissingUserError",
    "message": "You must be logged in to perform this action"
}
```

[Back to Top](#craftify-documentation)
## General Return Schema
### ERROR
```js
{
    "name": "NotFound",
    "message": "No book by ID 999"
}
```

### SUCCESS (sends back created/updated/deleted entity)
```js
{
    "id": 4,
    "title": "1984",
    "author": "George Orwell"
    "description": "George Orwell’s dystopian masterpiece..."
    "coverimage": "https://images.dummyurl.com/image.jpeg"
    "available": true
}
```

[Back to Top](#craftify-documentation)
## API Base URL (on localhost)
The base URL for testing and fetching API endpoints on a local test server is:

```https
localhost:3000/api
```

This can be stored in a variable for use in fetch calls:

```js
const API_URL = "localhost:3000/api";
```

A string literal can then be constructed to reach the enpoints described below. This example fetches all users from `/users` and console logs the resulting array of user objects.

```js
const response = await fetch(`${API_URL}/users`);
const result = await response.json();
console.log(result.users);
```

The resulting console log for an array with two users should look like this:

```js
[
    {
        "user_id": 1,
        "permissions": "user",
        "username": "emjay",
        "email": "emily@example.com",
        "password": "$2b$10$JTfrz2QcNa39zDMrMl/m0eDYvs8VAb8yZoEPBJlGj2X5y5FaNmbHO",
        "first_name": "Emily",
        "last_name": "Johnson",
        "address": "3200 Croyden Ave",
        "phone_number": "555-9032"
    },
    {
        "user_id": 2,
        "permissions": "user",
        "username": "liuwei",
        "email": "liu@example.com",
        "password": "$2b$10$bbpmk8s11P5GdZd/7zjmG.NnbZ/2va2fuHoW/wo1UwzzGfR5ptFVy",
        "first_name": "Liu",
        "last_name": "Wei",
        "address": "2500 Williams Rd.",
        "phone_number": "515-9032"
    },
    (...)
]
```

[Back to Top](#craftify-documentation)
## Endpoints
## Users Endpoints
### `GET /users` (Admin Only)
Returns the data for all users (for admin purposes).

#### Request Parameters
No request parameters required.

#### Body
No body required.

#### Return Parameters
An array of user objects:

- `user_id` (number)
- `permissions` (string)
- `username` (string)
- `email` (string)
- `password` (string)
- `first_name` (string)
- `last_name` (string)
- `address` (string)
- `phone_number` (string)

#### Sample Call
```js
const response = await fetch(`${API_URL}/users`);
const result = await response.json();
console.log(result.users);
```

#### Sample Response
```js
[
    {
        "user_id": 1,
        "permissions": "user",
        "username": "emjay",
        "email": "emily@example.com",
        "password": "$2b$10$JTfrz2QcNa39zDMrMl/m0eDYvs8VAb8yZoEPBJlGj2X5y5FaNmbHO",
        "first_name": "Emily",
        "last_name": "Johnson",
        "address": "3200 Croyden Ave",
        "phone_number": "555-9032"
    },
    {
        "user_id": 2,
        "permissions": "user",
        "username": "liuwei",
        "email": "liu@example.com",
        "password": "$2b$10$bbpmk8s11P5GdZd/7zjmG.NnbZ/2va2fuHoW/wo1UwzzGfR5ptFVy",
        "first_name": "Liu",
        "last_name": "Wei",
        "address": "2500 Williams Rd.",
        "phone_number": "515-9032"
    },
    (...)
]
```

[Back to Top](#craftify-documentation)
### `GET /users/:userId` (Admin Only)
Returns the data for a single user (for admin purposes).

#### Request Parameters
- `userId` (string, required)

#### Body
No body required.

#### Return Parameters
A user object.

- `user_id` (number)
- `permissions` (string)
- `username` (string)
- `email` (string)
- `password` (string)
- `first_name` (string)
- `last_name` (string)
- `address` (string)
- `phone_number` (string)

#### Sample Call
```js
// Import useParams at top of file
import { useParams } from 'react-router-dom';

// Destructure 'userId' from useParams before the API call
const { userId } = useParams();

// Pass 'userId' as parameter to the API call
const response = await fetch(`${API_URL}/users/user/${userId}`)
const result = await response.json();
console.log(result.users);
```

#### Sample Response
```js
{
    "user_id": 1,
    "permissions": "user",
    "username": "emjay",
    "email": "emily@example.com",
    "password": "$2b$10$JTfrz2QcNa39zDMrMl/m0eDYvs8VAb8yZoEPBJlGj2X5y5FaNmbHO",
    "first_name": "Emily",
    "last_name": "Johnson",
    "address": "3200 Croyden Ave",
    "phone_number": "555-9032"
}
```

[Back to Top](#craftify-documentation)
### `GET /users/me`
Returns the data for a logged in user (My Account).

#### Request Parameters
No request parameters required.

#### Body
No body required.

#### Headers (object, required)
- Content-Type (string, required): application/json
- Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}

#### Return Parameters
A user object corresponding to the logged in user.

- `user_id` (number)
- `permissions` (string)
- `username` (string)
- `email` (string)
- `password` (string)
- `first_name` (string)
- `last_name` (string)
- `address` (string)
- `phone_number` (string)

#### Sample Call
```js
// 'token' is defined as a state variable in App.jsx
const { token, setToken } = useState('');

// Pass 'token' into desired route on App.jsx (for example, 'MyAccount')
<Route path="/users/me" element={<MyAccount token={token} />} />

// Destructure 'token' from route parameters (for example, 'MyAccount.jsx')
function MyAccount({ token }) {...}

// Use token in authorization on API call
const response = await fetch(`${API_URL}/users/me`, {
    headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
    },
})
const result = await response.json();
console.log(result);
```

#### Sample Response
```js
{
    "user_id": 6,
    "permissions": "admin",
    "username": "crafTia",
    "email": "Craftia@example.com",
    "password": "$2b$10$sY/sal3k0uy1qXU/S5p4nOfSsK3cxLYYnwK9TYTP1Bc0FBIXrFEiy",
    "first_name": "Craft",
    "last_name": "Tia",
    "address": "2900 Candle Dr.",
    "phone_number": "565-9032"
}
```

[Back to Top](#craftify-documentation)
### `POST /users/register`
Allows the creation of a new user.

[Back to Top](#craftify-documentation)
### `POST /users/login`
Allows a user to login to an existing account.

[Back to Top](#craftify-documentation)
### `PUT /users/:userId` (Admin Only)
Updates the data for a single user (for admin purposes).

[Back to Top](#craftify-documentation)
## Products Endpoints
### `GET /products`
Returns the data for all products.

[Back to Top](#craftify-documentation)
### `GET /products/:productId`
Returns the data for a single product.

[Back to Top](#craftify-documentation)
### `POST /products` (Admin Only)
Allows the creation of a new product.

[Back to Top](#craftify-documentation)
### `PUT /products/:productId` (Admin Only)
Updates a product by product-id.

[Back to Top](#craftify-documentation)
### `DELETE /products/:productId` (Admin Only)
Deletes a product by product-id.

[Back to Top](#craftify-documentation)