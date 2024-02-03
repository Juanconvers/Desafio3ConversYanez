
import { Express } from "express";
import { ProductManager } from "./config/ProductManager";

const APP = express()
const PORT = 8000
const PRODUCTMANAGER = new ProductManager('./src/db/products.json')

APP.get('/', (req, res) => {
    res.send("Bienvenidos a mi primer servidor hecho con Express.")
}) 

APP.get('/products', async (req, res) => {
    const { limit } = req.query
    
    const productos = await PRODUCTMANAGER.getProducts()
    const limite = parseInt(limit)

    if (limite < 0){
        res.send("Por favor ingresar un número válido - Queries")
        }else{
        const productosLimite = productos.slice(0, limit)
        res.send(productosLimite)
        }
})

APP.get('/products/:pid', async (req, res) => {
    const idProducto = req.params.pid
    const producto = await PRODUCTMANAGER.getProductsById(idProducto)
    res.send(producto)
})


APP.listen(PORT,() => {
    console.log('Server on port ${PORT}')
})


