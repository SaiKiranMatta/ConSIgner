"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
    const [orders, setOrders] = useState({
        names: [""],
        locations: [[18.246, 78.134]],
        demands: [0],
        capacities: [10, 15, 20],
        vehicles: 3,
    });

    const [ordersToSend, setOrdersToSend] = useState(orders);
    const [responseData, setResponseData] = useState(null);

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

    const person = {
        name: "John Doe",
        age: 30,
        city: "New York",
        hobbies: ["reading", "hiking", "cooking"],
        address: {
            street: "123 Main St",
            city: "New York",
            zip: "10001",
        },
    };

    const handleAddToDeliver = (name, latitude, longitude, quantity) => {
        console.log("clicked");
        const updatedOrders = {
            ...orders,
            names: [...orders.names, name],
            locations: [...orders.locations, [latitude, longitude]],
            demands: [...orders.demands, quantity],
        };
        console.log(JSON.stringify(updatedOrders));
        setOrders(updatedOrders); // Update orders state
        setOrdersToSend(updatedOrders); // Update ordersToSend state
    };

    const sendOrdersToBackend = async () => {
        const url = process.env.NEXT_PUBLIC_Backend_address;
        console.log(orders);
        try {
            const response = await fetch(`${url}/solve-routing-problem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orders),
            });
            if (response.ok) {
                console.log("Orders successfully sent to backend");
                const responseData = await response.json();
                console.log("Received response from backend:", responseData);
                setResponseData(responseData);
                // You can also update the UI or take any other action if needed
            } else {
                console.error("Failed to send orders to backend");
            }
        } catch (error) {
            console.error("Error sending orders to backend:", error);
        }
    };

    const [names, setNames] = useState([]);
    const [demands, setDemands] = useState([]);

    useEffect(() => {
        if (ordersToSend) {
            const { names, demands } = ordersToSend;
            console.log(names, demands);
            setNames(names);
            setDemands(demands);
        }
    }, [ordersToSend]);

    const [capacityInput, setCapacityInput] = useState("");

    // Function to handle change in input field for capacity
    const handleCapacityChange = (e) => {
        setCapacityInput(e.target.value);
    };

    // Function to update vehicles and capacities
    const addCapacity = () => {
        const newCapacity = parseInt(capacityInput);

        if (!isNaN(newCapacity) && newCapacity > 0) {
            setOrders((prevOrders) => ({
                ...prevOrders,
                capacities: [...prevOrders.capacities, newCapacity],
                vehicles: prevOrders.vehicles + 1,
            }));
            setCapacityInput(""); // Clear input field after adding capacity
        } else {
            alert("Please enter a valid positive number for capacity.");
        }
    };

    return (
        <main className="pt-32 bg-slate-200">
            <div className="flex flex-row justify-evenly ">
                <div className="flex flex-col items-center justify-start ">
                    <h2 className="text-4xl text-black mb-7">Orders List</h2>
                    <ul className="h-[24rem] overflow-y-auto ">
                        {ordersData.orders.map((order) => (
                            <li
                                key={order.orderID}
                                className="flex flex-row items-center justify-between px-4 py-4 mb-4 border-[0.5px] border-slate-500 shadow-lg bg-slate-300 min-w-96 rounded-3xl"
                            >
                                <Image
                                    width={40}
                                    height={20}
                                    src="/shoppingcart.png"
                                    alt="cart"
                                    className="self-start p-2 rounded-full bg-slate-200"
                                />
                                {/* <div>Order ID: {order.orderID}</div> */}
                                <div className="flex-grow mx-4 text-black">
                                    {" "}
                                    {order.name}
                                </div>

                                {/* <div>
                                Location: ({order.location.latitude},{" "}
                                {order.location.longitude})
                            </div> */}
                                <div className="flex flex-row items-center">
                                    <div className="w-20 text-blue-800">
                                        Qty:
                                        <span className="text-black">
                                            {" "}
                                            {order.quantity}
                                        </span>
                                    </div>
                                    <div
                                        className="px-4 py-2 bg-blue-700 border-[0.1px] border-blue-900 shadow-lg cursor-pointer rounded-xl "
                                        onClick={() =>
                                            handleAddToDeliver(
                                                order.name,
                                                order.location.latitude,
                                                order.location.longitude,
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
                </div>
                <div className="flex flex-col items-center justify-start ">
                    <h2 className="text-4xl text-black mb-7">
                        Added to deliver list
                    </h2>
                    <div className="flex flex-col items-start justify-start w-64 gap-4 text-black">
                        <div className="flex flex-row justify-between w-full">
                            <span>Current Vehicles: </span>
                            <span className="text-blue-600 ">
                                {orders.vehicles}
                            </span>
                        </div>
                        <p className="flex flex-row justify-between w-full ">
                            Current Capacities:{" "}
                            <span className="text-blue-600 ">
                                {orders.capacities.join(", ")}{" "}
                            </span>
                        </p>
                        <div className="flex flex-row justify-between w-full mb-6 ">
                            <input
                                type="number"
                                placeholder="Enter new vehicle capacity"
                                value={capacityInput}
                                onChange={handleCapacityChange}
                                className="w-40 px-4 py-2 rounded-md "
                            />
                            <button
                                className="px-4 py-2 text-white text-lg text-center border-[0.1px] border-blue-900 bg-blue-700 cursor-pointer w-20 rounded-xl"
                                onClick={addCapacity}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <ul className="h-[24rem] overflow-y-auto">
                        {names?.slice(1).map((name, index) => (
                            <li
                                className="flex flex-row items-center justify-between px-4 py-4 mb-4 border-[0.5px] border-slate-500 shadow-lg bg-slate-300 min-w-96 rounded-3xl"
                                key={index}
                            >
                                <Image
                                    width={40}
                                    height={20}
                                    src="/shoppingcart.png"
                                    alt="cart"
                                    className="self-start p-2 rounded-full bg-slate-200"
                                />
                                <p className="flex-grow mx-4 text-black">
                                    Name: {name}
                                </p>
                                <p>Demand: {demands[index]}</p>
                            </li>
                        ))}
                    </ul>
                    <div
                        className="px-4 py-2 text-lg text-center border-[0.1px] border-blue-900 bg-blue-700 cursor-pointer w-80 rounded-xl"
                        onClick={sendOrdersToBackend}
                    >
                        Calculate Delivery detalis
                    </div>
                </div>
            </div>
            <div className="w-full h-1 mt-10 bg-slate-500"></div>
            <div className="w-full mt-20 text-center">
                <h1 className="text-3xl text-black">Delivery Details</h1>
                <ul className="flex flex-col items-center justify-start ">
                    {responseData &&
                        responseData.map((result, index) => (
                            <li
                                className="flex text-black flex-row items-center h-20 px-4 py-2 my-4 justify-between rounded-3xl shadow-lg w-4/5 border-slate-600 border-[0.5px] bg-slate-300"
                                key={index}
                            >
                                <div>Driver: {result.driver}</div>
                                <div>Route: {result.route.join(", ")}</div>
                                <div>
                                    Total Distance: {result.total_distance}
                                </div>
                                <div>
                                    Parcels Delivered:{" "}
                                    {result.parcels_delivered}
                                </div>
                                <hr />
                            </li>
                        ))}
                </ul>
            </div>
        </main>
    );
};

export default page;
