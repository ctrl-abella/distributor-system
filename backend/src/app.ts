import express from "express";
import cors from "cors";
import path from "path";


import productRoutes from "./routes/product.routes";
import contactRoutes from "./routes/contact.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";


const app = express();

app.use(cors());

app.use("/api", paymentRoutes);

app.use(express.json());

console.log(path.join(process.cwd(), "uploads"));
app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api", productRoutes);
app.use("/api", contactRoutes);
app.use("/api", orderRoutes);


export default app;