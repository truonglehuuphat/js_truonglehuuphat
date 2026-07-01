const http = require("http")

const products = [
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


const users = [
    {
        id: 1,
        name: "John",
        age: 10
    },
    {
        id: 2,
        name: "Honda",
        age: 11
    }
]

const server = http.createServer((req, res) => {
    try {
        if (req.url === "/products") {
            res.end(JSON.stringify(products))
            return;
        }
        if (req.url === "/users") {
            res.end(JSON.stringify(users))
            return;
        }
        res.end("Not found")
    } catch (error) {
         res.end(error)
    }

})

server.listen(3001)