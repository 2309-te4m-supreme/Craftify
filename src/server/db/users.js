const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async ({
    permissions,
    username,
    email,
    password,
    first_name,
    last_name,
    address,
    phone_number }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user] } = await db.query(`
        INSERT INTO users(
            permissions,
            username,
            email,
            password,
            first_name,
            last_name,
            address,
            phone_number )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`, [
            permissions,
            username,
            email,
            hashedPassword,
            first_name,
            last_name,
            address,
            phone_number]);
        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const {rows} = await db.query(`
            SELECT * FROM users;
        `)
        return rows
    } catch (error) {
        throw err;
    }
}

const getUser = async ({ email, password }) => {
    if (!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async (email) => {
    try {
        const { rows: [user] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [email]);

        if (!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserById = async (userId) => {
    try {
        const { rows: [user] } = await db.query(`
        SELECT * 
        FROM users
        WHERE users_id=$1;`, [userId]);

        if (!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

// TODO Update User (Admin) Success
async function updateUser({id, ...fields}){
    try {

      let user;
        if (!fields.permissions) {
          fields.permissions = 'user'
        }
        const {rows} = await db.query(`
          UPDATE users
          SET  
          permissions= $1, 
          username = $2, 
          email = $3, 
          password = $4, 
          first_name = $5, 
          last_name = $6, 
          address = $7,
          phone_number = $8
          WHERE users_id = $9
          RETURNING *;
        `, [fields.permissions, fields.username, fields.email, fields.password, fields.first_name, fields.last_name, fields.address, fields.phone_number, id]);

        user = rows[0];
        return user;

    } catch (error) {
      throw error
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    getUserById,
    updateUser
};