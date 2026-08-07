import { Router } from "express";
import { submitContactForm } from "../controllers/contact.controller";
import { contactRateLimiter } from "../middleware/contactRateLimiter";

const router = Router();

router.post(
    "/contact",
     contactRateLimiter,
    submitContactForm);

export default router;

