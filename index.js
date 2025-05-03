import "./db/index.js";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// app.use("/", (req, res) => res.status(200).json({ message: "Hello World" }));
app.use("/users", userRouter);
app.use("/{*any}", (req, res) => res.status(404).json({ error: "Not Found" }));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
