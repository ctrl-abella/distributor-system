import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    })
});

async function main(){
    const productID = 8;

    await prisma.product.update({
    where: {
        id: productID,
    },
    data: {
        
        fullDescription:
            "Intra is a powerful botanical beverage made from 23 time-tested herbal extracts, specially formulated to support the body's eight biological systems. With over 30 years of proven results, this all-natural supplement helps enhance overall wellness, energy levels, and immune function.",

        keyBenefits: {
            "Antioxidants": "Rich in antioxidants for cellular protection",
            "Immune Support": "Supports immune system health",
            "Strengthens Body": "Balances and strengthens the body's systems",
            "Energy and Vitality": "Boosts energy and vitality",
            "Digestion and Detoxification": "Aids in digestion and detoxification"
        },
        
    },
});
}
main()

