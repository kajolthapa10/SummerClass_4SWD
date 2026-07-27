// server.js
import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import { requestLogger } from "./middleware/logger.js";

const app = express();
const PORT = 3000;

// Custom logging middleware — runs first, for every incoming request
app.use(requestLogger);

// Middleware to parse JSON request bodies (built into Express — no extra library needed)
app.use(express.json());

// Mount all todo routes under /api/todos
app.use("/api/todos", todoRoutes);

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});