import express from 'express'

const server = express()

server.use(express.json())

let products = [{
    id: 1,
    name: "iphone",
    price: 2000
},
{
    id: 2,
    name: "ipad",
    price: 2100
}
]
// GET
server.get("/products", (request, response) => {
    response.json(products);
})

//POST
server.post("/products", (request, response) => {
    const body = { id: products.length + 1, ...request.body };
    products.push(body);
    response.json({
        message: "Successfully create"
    });
})
// PUT
server.put("/products/:id", (request, response) => {
    const id = Number(request.params.id);
    const body = request.body;
  
    products = products.map((item) => {
        if (item.id === id) {
            return {
                ...body,
                id: item.id
            }
        }
    })
    response.json({
        message: "Successfully put"
    });
})
// DELETE
server.delete("/products/:id", (request, response) => {
    const id = Number(request.params.id);
    if(!products.find((item) => item.id === id)){
        response.status(404).json({
            message: "Not found target product"
        })
        return;
    }
    products = products.filter((item) => { return item.id !== id })
    response.json({
        message: "Successfully delete"
    });
})
server.listen(3000);