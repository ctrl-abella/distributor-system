import express from "express";
import cors from "cors";
import path from "path";


import productRoutes from "./routes/product.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();

app.use(cors());

app.use(express.json());

console.log(path.join(process.cwd(), "uploads"));
app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api", productRoutes);
app.use("/api", contactRoutes)

export default app;