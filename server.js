import express from "express";
import json from "./data.js";

let data = [...json];

const server = express();

server.use(express.json());

server.get("/api", (req, res) => {
  res.send(
    "bienvenidos favor de utilizar la ruta /api/remeras para hacer peticiones http"
  );
});

server.get("/api/remeras", (req, res) => {
  res.json(data);
});

let idCurrent = 2;
server.post("/api/remeras", (req, res) => {
  const { name, tipo, price } = req.body;
  const newRemera = { name, tipo, price, id: +idCurrent };
  data.push(newRemera);
  res.json({ message: "remera agregada con exito" });
});

server.get("/api/remeras/:id", (req, res) => {
  const { id } = req.params;
  const found = data.find((r) => r.id === parseInt(id));
  if (!found) return res.status(404).json({ error: "remera no encontrada" });
  res.json(found);
});

server.put("/api/remeras/:id", (req, res) => {
  const price = req.body.price;
  const { id } = req.params;
  const found = data.find((r) => r.id === parseInt(id));
  if (!found) return res.status(404).json({ error: "remera no encontrada" });
  found.price = parseInt(price);
  res.json({ message: "precio actualizado con exito" });
});

server.delete("/api/remeras/:id", (req, res) => {
  const { id } = req.params;
  const found = data.find((r) => r.id === parseInt(id));
  if (!found) return res.status(404).json({ error: "remera no encontrada" });

  data = data.filter((r) => r.id !== parseInt(id));
  res.json({ message: "remera eliminada con exito" });
});

server.listen(8080, () => console.log("puerto levantado en 8080"));
