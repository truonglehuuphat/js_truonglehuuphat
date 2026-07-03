import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";
import { Product, ApiResponse } from "./types";

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "../data/products.json");

function readProducts(): Product[] {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Product[];
}

function sendJSON<T>(res: ServerResponse, statusCode: number, body: ApiResponse<T>): void {
    res.writeHead(statusCode, { "Content-type": "applicaiton/json" });
    res.end(JSON.stringify(body));
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url!, 'http://localhost');
    const pathname = url.pathname;
    try {
        // GET method
        if (req.method === "GET" && pathname === "/products") {
            const products = readProducts();
            return sendJSON(res, 200, { success: true, data: products });
        }
        // GET product Id
        const matchId = pathname.match(/^\/products\/(\d+)$/);
        if (req.method === "GET" && matchId) {
            const id = parseInt(matchId[1]);
            const product = readProducts().find((item) => item.id === id)
            if (!product) {
                return sendJSON(res, 404, { success: false, message: "Không tìm thấy sản phẩm" });
            }
            return sendJSON(res, 200, { success: true, data: product });
        }

        return sendJSON(res, 404, { success: false, message: "Route không tồn tại" });
    } catch (e) {
        return sendJSON(res, 500, { success: false, message: "Lỗi server" });
    } finally {

    }

})

server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
