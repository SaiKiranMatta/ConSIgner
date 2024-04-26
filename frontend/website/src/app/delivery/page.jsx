"use client";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
    const [orders, setOrders] = useState({
        names: [""],
        locations: [(18.0447, 78.4252)],
        demands: [0],
        capacities: [10, 15, 20],
        vehicles: 3,
    });

    var ordersData = {
        orders: [
            {
                orderID: 1,
                name: "iPhone 16 Pro Max 256GB",
                quantity: 10,
                location: {
                    latitude: 40.7128,
                    longitude: -74.006,
                },
            },
            {
                orderID: 2,
                name: "Samsung S22 Ultra 512GB",
                quantity: 5,
                location: {
                    latitude: 34.0522,
                    longitude: -118.2437,
                },
            },
            {
                orderID: 3,
                name: "OnePlus 11 8GB",
                quantity: 8,
                location: {
                    latitude: 51.5074,
                    longitude: -0.1278,
                },
            },
            {
                orderID: 4,
                name: "Apple MacBook Air M1 256GB",
                quantity: 12,
                location: {
                    latitude: -33.8688,
                    longitude: 151.2093,
                },
            },
        ],
    };

    const handleAddToDeliver = (location, quantity) => {
        console.log("clicked");
        setOrders((prevOrders) => ({
            ...prevOrders,
            locations: [...prevOrders.locations, location],
            demands: [...prevOrders.demands, quantity],
        }));
        console.log(orders);
    };

    const sendOrdersToBackend = async () => {
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orders),
            });
            if (response.ok) {
                console.log("Orders successfully sent to backend");
                // You can also update the UI or take any other action if needed
            } else {
                console.error("Failed to send orders to backend");
            }
        } catch (error) {
            console.error("Error sending orders to backend:", error);
        }
    };

    return (
        <main className="pt-16 ">
            <div className="flex flex-col items-center justify-evenly">
                <h2 className="text-4xl mb-7 ">Orders List</h2>
                <ul>
                    {ordersData.orders.map((order) => (
                        <li
                            key={order.orderID}
                            className="flex flex-row items-center justify-between px-4 py-4 mb-4 border border-blue-800 min-w-96 rounded-3xl"
                        >
                            <Image
                                width={40}
                                height={20}
                                src="/shoppingcart.png"
                                alt="cart"
                                className="self-start p-2 bg-blue-800 rounded-full"
                            />
                            {/* <div>Order ID: {order.orderID}</div> */}
                            <div className="flex-grow mx-4"> {order.name}</div>

                            {/* <div>
                                Location: ({order.location.latitude},{" "}
                                {order.location.longitude})
                            </div> */}
                            <div className="flex flex-row items-center">
                                <div className="w-20 ">
                                    Qty:
                                    <span className="text-blue-800 ">
                                        {" "}
                                        {order.quantity}
                                    </span>
                                </div>
                                <div
                                    className="px-4 py-2 bg-blue-800 cursor-pointer rounded-xl "
                                    onClick={() =>
                                        handleAddToDeliver(
                                            order.location,
                                            order.quantity
                                        )
                                    }
                                >
                                    Add to Deliver
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="px-4 py-2 text-lg text-center bg-blue-800 cursor-pointer w-80 rounded-xl">
                    Calculate Delivery detalis
                </div>
            </div>
        </main>
    );
};

export default page;
