import express from "express";
import  autoresRouter  from '../components/authors/authorsRouters.js';

// instance
const app = express();

// Middleware para permitir solicitudes desde cualquier origen (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Form settings
// Parse form json
app.use(express.json());
// Parse form multiplatform
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/autores", autoresRouter);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
