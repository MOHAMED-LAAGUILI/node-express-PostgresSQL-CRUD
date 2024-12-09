import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connection } from './db/postgres.js';
import router from './view/routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({

}))
app.use(router);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      console.warn(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Error connecting to the database: ", e);
    process.exit(1);
  }
};


startServer();
