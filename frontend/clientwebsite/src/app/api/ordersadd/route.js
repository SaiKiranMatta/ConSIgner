import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { orderID, name, quantity, location } = await req.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Create the order
        await Order.create({
            orderID,
            name,
            quantity,
            location,
        });

        return NextResponse.json(
            { message: "Order added successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "An error occurred while adding the order." },
            { status: 500 }
        );
    }
}
