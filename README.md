##  🏁 Getting Started

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

## Data Table Breakdown

### 1. Users Table

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

### 2. Products Table

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

### 3. Orders Table

The `orders` table tracks orders placed by users. It typically includes fields such as:

| Field Name | Data Type | Description |
|---|---|---|
| order_id | INT | Unique identifier for each order |
| user_id | INT | Foreign key referencing the `user_id` in the `users` table, indicating the user who placed the order |
| order_date | DATETIME | Date and time when the order was placed |
| order_status | VARCHAR(255) | Current status of the order, such as "open" or "completed" |
| order_total | DECIMAL(10,2) | Total amount of the order, including product prices and any applicable taxes or shipping costs |

### 4. Orders_Products Table

The `orders_products` table serves as a junction table, linking orders to the products included in those orders. It typically includes fields such as:

| Field Name | Data Type | Description |
|---|---|---|
| order_id | INT | Foreign key referencing the `order_id` in the `orders` table, indicating the order to which the product belongs |
| product_id | INT | Foreign key referencing the `product_id` in the `products` table, indicating the product associated with the order |
| quantity | INT | Number of units of the product purchased in that order |

