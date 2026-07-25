import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_POST) ?? 5432,
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "school_db",
    max: 10, // tối đa 10 kết nối
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

pool.connect()
    .then(() => console.log("Kết nối PostgreSQL Thành Công"))
    .catch((err) => console.error("Lỗi Kết nối ", err.message));

export default pool;