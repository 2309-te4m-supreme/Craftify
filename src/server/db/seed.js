const db = require('./client');
const { createUser } = require('./users');
const { createProduct } = require('./products');
const { products } = require('./productsData')
const users = [
  {
    users_id: 1,
    permissions: 'user',
    email: 'emily@example.com',
    password: 'securepass',
    first_name: 'Emily',
    last_name: 'Johnson',
    address: '3200 Croyden Ave',
    phone_number: '555-9032',
  },
  {
    users_id: 2,
    permissions: 'user',
    email: 'liu@example.com',
    password: 'strongpass',
    first_name: 'Liu',
    last_name: 'Wei',
    address: '2500 Williams Rd.',
    phone_number: '515-9032',
  },
  {
    users_id: 3,
    permissions: 'user',
    email: 'bella@example.com',
    password: 'pass1234',
    first_name: 'Isabella',
    last_name: 'García',
    address: '2300 Henderson Rd.',
    phone_number: '525-9032',
    
  },
  {
    users_id: 4,
    permissions: 'user',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    first_name: 'Mohammed',
    last_name: 'Ahmed',
    address: '2300 Anderson Rd.',
    phone_number: '535-9032',
    
  },
  {
    users_id: 5,
    permissions: 'user',
    email: 'john@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Smith',
    address: '2900 Canderson Rd.',
    phone_number: '545-9032',
    
  },
  {
    users_id: 6,
    permissions: 'admin',
    email: 'Craftia@example.com',
    password: 'code123',
    first_name: 'Craft',
    last_name: 'Tia',
    address: '2900 Candle Dr.',
    phone_number: '565-9032',
    
  },
  // Add more user objects as needed
];

const dropTables = async () => {
  try {
    console.log("Dropping tables...")
    await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        DROP TYPE IF EXISTS permission;
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
          
        CREATE TABLE users (
          users_id SERIAL PRIMARY KEY,
          permissions permission,
          email varchar(255),
          password varchar(255),
          first_name varchar(255),
          last_name varchar(255),
          address varchar(255),
          phone_number varchar(255)
        );

        CREATE TABLE products (
          product_id INTEGER PRIMARY KEY,
          product_name VARCHAR(255),
          product_description TEXT,
          product_price DECIMAL(10,2),
          product_image VARCHAR(255),
          product_category VARCHAR(255),
          product_stock INTEGER
        );`)

  }
  catch (err) {
    throw err;
  }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({ 
        users_id: user.users_id,
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
        product_id: product.product_id,
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



const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertProducts();
  }
  catch (err) {
    throw err;
  }
  finally {
    db.end()
  }
}

seedDatabse()
