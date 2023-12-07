const db = require('./client');
const { createUser } = require('./users');
const { createProduct } = require('./products');
const { createOrder } = require('./orders');
const { createOrders_Product } = require('./orders_products');
const { products } = require('./productsData')

const users = [
  {
    user_id: 1,
    permissions: 'user',
    username: 'emjay',
    email: 'emily@example.com',
    password: 'securepass',
    first_name: 'Emily',
    last_name: 'Johnson',
    address: '3200 Croyden Ave',
    phone_number: '555-9032',
  },
  {
    user_id: 2,
    permissions: 'user',
    username: 'liuwei',
    email: 'liu@example.com',
    password: 'strongpass',
    first_name: 'Liu',
    last_name: 'Wei',
    address: '2500 Williams Rd.',
    phone_number: '515-9032',
  },
  {
    user_id: 3,
    permissions: 'user',
    username: 'bellaG',
    email: 'bella@example.com',
    password: 'pass1234',
    first_name: 'Isabella',
    last_name: 'García',
    address: '2300 Henderson Rd.',
    phone_number: '525-9032',
  },
  {
    user_id: 4,
    permissions: 'user',
    username: 'moahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    first_name: 'Mohammed',
    last_name: 'Ahmed',
    address: '2300 Anderson Rd.',
    phone_number: '535-9032',
  },
  {
    user_id: 5,
    permissions: 'user',
    username: 'jsmith',
    email: 'john@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Smith',
    address: '2900 Canderson Rd.',
    phone_number: '545-9032',
  },
  {
    user_id: 6,
    permissions: 'admin',
    username: 'crafTia',
    email: 'Craftia@example.com',
    password: 'Code123',
    first_name: 'Craft',
    last_name: 'Tia',
    address: '2900 Candle Dr.',
    phone_number: '565-9032',
  },
  // Add more user objects as needed
];

const orders = [
  {
    user_id: 3,
    order_total: 42,
  },
  {
    user_id: 4,
    order_total: 159,
  },
  {
    user_id: 6,
    order_total: 872,
  },
  {
    user_id: 6,
    order_status: "In Progress",
    order_total: 872,
  }

];

const orders_products = [
  {
    order_id: 1,
    product_id: 15,
    quantity: 30,
  },
  {
    order_id: 2,
    product_id: 47,
    quantity: 4,
  },
  {
    order_id: 3,
    product_id: 2,
    quantity: 5,
  },
  {
    order_id: 1,
    product_id: 20,
    quantity: 53,
  }

];


const dropTables = async () => {
  try {
    console.log("Dropping tables...")
    await db.query(`
        DROP TABLE IF EXISTS orders_products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        DROP TYPE IF EXISTS permission;
        DROP TYPE IF EXISTS status;
        `)
  }
  catch (err) {
    throw err;
  }
}

const createTables = async () => {
  try {
    console.log("Creating tables...")
    await db.query(`
        CREATE TYPE permission AS ENUM ('user', 'admin');
        CREATE TYPE status AS ENUM ('Pending', 'In Progress');
          
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          permissions permission,
          username varchar(255),
          email varchar(255),
          password varchar(255),
          first_name varchar(255),
          last_name varchar(255),
          address varchar(255),
          phone_number varchar(255)
        );

        CREATE TABLE products (
          product_id SERIAL PRIMARY KEY,
          product_name VARCHAR(255),
          product_description TEXT,
          product_price DECIMAL(10,2),
          product_image VARCHAR(255),
          product_category VARCHAR(255),
          product_stock INTEGER
        );
        CREATE TABLE orders (
          order_id SERIAL PRIMARY KEY,
          user_id integer,
          order_date TIMESTAMP,
          order_status status,
          order_total DECIMAL(10,2)
        );
        
        CREATE TABLE orders_products (
          order_id integer,
          product_id integer,
          quantity integer
        );
        
        ALTER TABLE orders 
        ADD FOREIGN KEY ("user_id") 
        REFERENCES users ("user_id");
        
        ALTER TABLE orders_products 
        ADD FOREIGN KEY ("product_id") 
        REFERENCES products ("product_id");
        
        ALTER TABLE orders_products 
        ADD FOREIGN KEY ("order_id") 
        REFERENCES orders ("order_id");
        
        `)

  }
  catch (err) {
    throw err;
  }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({ 
        user_id: user.user_id,
        permissions: user.permissions,
        username: user.username,
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        phone_number: user.phone_number
      });
    }
    console.log('Seed User data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({
        product_name: product.product_name,
        product_description: product.product_description,
        product_price: product.product_price,
        product_image: product.product_image,
        product_category: product.product_category,
        product_stock: product.product_stock
      });
    }
    console.log('Seed Products data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertOrders = async () => {

  try {
    for (const order of orders) {
      await createOrder(
        order.user_id,
        order.order_total,
        order.order_status
      );
    }
    console.log('Seed Orders data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertOrders_Products = async () => {

  try {
    for (const orders_product of orders_products) {
      await createOrders_Product({
        order_id: orders_product.order_id,
        product_id: orders_product.product_id,
        quantity: orders_product.quantity,

      });
    }
    console.log('Seed Orders_Products data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};



const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertProducts();
    await insertOrders();
    await insertOrders_Products();
    
  }
  catch (err) {
    throw err;
  }
  finally {
    db.end()
  }
}

seedDatabse()
