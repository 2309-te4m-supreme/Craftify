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

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    getUserById
};