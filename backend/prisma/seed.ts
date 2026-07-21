import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    })
});

async function main(){
    const category = await prisma.category.create({
        data: {
            name: "Capsules"
        },
    });

    await prisma.product.create({
        data: {
            sku: "CRL01",
            name: "CardioLife",
            price: 1880,
            stock: 10,
            imageUrl: "/uploads/products/CardioLife.png",
            categoryId: category.id,
        },
    });
    
}
main()

