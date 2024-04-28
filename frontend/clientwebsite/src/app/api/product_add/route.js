import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, description, weight, dimension, image } =
            await req.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Create the product
        await Product.create({
            name,
            description,
            weight,
            dimension,
            image,
        });

        return NextResponse.json(
            { message: "Product added successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "An error occurred while adding the product." },
            { status: 500 }
        );
    }
}
