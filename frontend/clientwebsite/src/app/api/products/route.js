// Import necessary modules
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

// Define the API route handler for fetching products
export async function GET() {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch products from MongoDB
        const products = await Product.find();

        // Return products as JSON response
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.log(error);
        // Return an error message if an error occurs
        return NextResponse.json(
            { message: "An error occurred while fetching products." },
            { status: 500 }
        );
    }
}
