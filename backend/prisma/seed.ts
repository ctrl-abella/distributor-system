import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    })
});

async function main(){
    const productID = 7;

    await prisma.product.update({
    where: {
        id: productID,
    },
    data: {
        
        fullDescription:
            "FibreLife is a premium dietary supplement that supports digestive health and overall well-being. Packed with a blend of natural ingredients, including soluble and insoluble fibers. FibreLife promotes regular bowel movements, helps maintain healthy cholesterol levels, and supports a healthy weight. This product combines the benefits of plant-based fibers with essential nutrients, making it a perfect addition to any daily wellness routine.",

        keyBenefits: {
            "Supports Digestive Health":
                "Aids in promoting regular bowel movements and preventing constipation",
            "Heart Health":
                "Helps maintain healthy cholesterol levels and supports cardiovascular health",
            "Weight Management":
                "The fiber content promotes feeling of fullness, helping control appetite and manage weight",
            "Natural Ingredients": 
                "Made with a blend of soluble and insoluble fibers, derived from plants to ensure the highest quality and effectiveness",
            "Convenient":
                "Easy to take, FibreLife provides an effortless way to incorporate fiber into your diet"
        },
        
    },
});
}
main()

