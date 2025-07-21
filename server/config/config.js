
import { config } from "dotenv";
import knex from 'knex';
config();


const conn = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'powerwash',
  },
});


export default conn;