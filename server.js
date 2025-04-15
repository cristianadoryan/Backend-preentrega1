import express from "express";
import ProductManager from "./managers/ProductManager.js";
import CartManager from "./managers/CartManager.js";

const app = express();

app.use(express.json());

const productManager = new ProductManager();
const cartManager = new CartManager();

// 📦 Rutas de productos
app.get("/api/products", async (req, res) => {
  const productos = await productManager.getProducts();
  res.json({ productos });
});

app.get("/api/products/:pid", async (req, res) => {
  const producto = await productManager.getProductById(req.params.pid);
  if (!producto) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json({ producto });
});

app.post("/api/products", async (req, res) => {
  const nuevoProducto = await productManager.addProduct(req.body);
  res
    .status(201)
    .json({ mensaje: "The product has been added", producto: nuevoProducto });
});

app.put("/api/products/:pid", async (req, res) => {
  const productoActualizado = await productManager.updateProduct(
    req.params.pid,
    req.body
  );
  if (!productoActualizado) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json({ mensaje: "Updated product", producto: productoActualizado });
});

app.delete("/api/products/:pid", async (req, res) => {
  const eliminado = await productManager.deleteProduct(req.params.pid);
  if (!eliminado) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json({ mensaje: "The product has been removed" });
});

// 🛒 Rutas de carritos
app.post("/api/carts", async (req, res) => {
  const carrito = await cartManager.createCart();
  res.status(201).json({ mensaje: "Cart created successfully", carrito });
});

app.get("/api/carts/:cid", async (req, res) => {
  const carrito = await cartManager.getCartById(req.params.cid);
  if (!carrito) {
    return res.status(404).json({ error: "Cart not found" });
  }
  res.json({ productos: carrito.products });
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  const carritoActualizado = await cartManager.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  if (!carritoActualizado) {
    return res.status(404).json({ error: "The product could not be added." });
  }
  res.json({
    mensaje: "The product has been added",
    carrito: carritoActualizado,
  });
});

// 🚀 Servidor en puerto 8080
app.listen(8080, () => console.log("Server listen on port 8080"));
