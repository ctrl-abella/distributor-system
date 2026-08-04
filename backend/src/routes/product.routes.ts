import { Router } from "express";
import { getProducts, getProductById, getRelatedProducts } from "../controllers/product.controller";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.get("/products/:id/related", getRelatedProducts);

export default router;