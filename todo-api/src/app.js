import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my To-Do App Api");
});

app.use("/api/todo", todoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;