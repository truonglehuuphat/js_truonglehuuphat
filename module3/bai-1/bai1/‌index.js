const http = require("http")

products = [
    {
        id: 1,
        name: "Laptop",
        price: 2000
    },
    {
        id: 2,
        name: "Cellphone",
        price: 1000
    }
]

const server = http.createServer((request, response) => {
    console.log(request.method)
    //GET /product -> Lay toan bo san pham
    if (request.url === "/products" && request.method === "GET") {
        response.end(JSON.stringify(products))
        return;
    }
    //POST /product -> tao san pham moi
    if (request.url === "/products" && request.method === "POST") {
        let body = "";
        request.on("data", chunk => body += chunk);
        request.on("end", () => {
            try {
                const newProduct = JSON.parse(body);
                products.push({
                    ...newProduct,
                    id: products.length + 1
                })
                response.end("Succesfully create");
            }
            catch (e) {
                response.end("Something went wrong");
            }
        })
        return;
    }
    //PUT /product -> tao san pham moi
    if (request.url.startsWith("/products") && request.method === "PUT") {
        const id = parseInt(request.url.split("/")[2])
        let body = "";
        if (!products.find((item) => item.id === id)) {
            response.end("Can not found the target product");
            return;
        }
        request.on("data", chunk => body += chunk);
        request.on("end", () => {
            try {
                const parseBody = JSON.parse(body);
                products = products.map((item) => {
                    if (item.id === id) {
                        return {
                            ...parseBody,
                            id: id
                        }
                    }
                    return item
                })
                response.end("Succesfully update");
            }
            catch (e) {
                response.end("Something went wrong");
            }
        })
        return;
    }

    //DELETE /product -> tao san pham moi
    if (request.url.startsWith("/products") && request.method === "DELETE") {
        const id = parseInt(request.url.split("/")[2])
        if (!products.find((item) => item.id === id)) {
            response.end("Can not found the target product");
            return;
        }
        products = products.filter((item) => {
            return item.id !== id
        })
        response.end("Succesfully delete");
        return;
    }
})

server.listen(3001)