const db = require('./client');
const { createUser } = require('./users');
const { products } = require('./productsData')
const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  

const dropTables = async () => {
    try {
      console.log("Dropping tables...")
        await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
      console.log("Creating tables...")
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
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
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
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
        console.log(`products at the index of 0: ${products[0].product_name}`)
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
