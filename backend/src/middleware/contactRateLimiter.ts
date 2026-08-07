import { rateLimit } from "express-rate-limit";

export const contactRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 3,

    standardHeaders: true,

    legacyHeaders: false,
    
    message: {
        message: "Too many inquiries submitted. Please try again in a minute."
    }
})