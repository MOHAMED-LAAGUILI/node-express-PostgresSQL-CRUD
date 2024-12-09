import { Sequelize } from "sequelize";
import { createUserModel } from "../model/user.model.js";

// Initialize Sequelize instance with database connection details
const sequelize = new Sequelize('postgres', 'postgres', 'pg', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Disable logging for cleaner output (can be true for debugging)
});

// Declare user model variable
let userModel = null;

// Define the connection function
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Postgres-SQL successfully');
        userModel = await createUserModel(sequelize);
        console.log('userModel created');
        await sequelize.sync();
        console.log('DB synced'); 
    } catch (e) {
        console.error('Unable to connect to PostgreSQL:', e);
}
};

export { connection, sequelize, userModel };
