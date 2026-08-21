import { Router, raw } from "express";
import { handlePayMongoWebhook } from "../controllers/payment.controller";

const router = Router();

router.post(
    "/payments/paymongo/webhook",
    raw({ type: "application/json" }),
    handlePayMongoWebhook
);

export default router;