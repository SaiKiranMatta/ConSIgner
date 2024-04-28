"use client";
import { useState, useEffect } from "react";
import axios from "axios";

function AddOrder({ product, quantity, onQuantityChange, onAddOrder }) {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Get user's location when component mounts
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    }, []);

    const handleBuyNow = async () => {
        if (!userLocation) {
            console.error("User location not available.");
            return;
        }

        const orderID = generateOrderID(); // Generate unique order ID

        try {
            const response = await axios.post("/api/ordersadd", {
                orderID,
                name: product.name,
                quantity,
                location: userLocation, // Use user's location
            });
            onAddOrder(response.data); // Assuming the API returns the newly added order
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    const generateOrderID = () => {
        // Generate a unique order ID (you can use any method/library to generate IDs)
        return Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="flex flex-row items-center w-full mt-2 justify-evenly">
            <input
                type="number"
                value={quantity}
                onChange={(e) => onQuantityChange(parseInt(e.target.value))}
                min="1"
                className="w-16 px-2 py-1 border rounded-xl "
            />
            <button
                className="px-4 py-2 mt-auto mb-4 text-white bg-blue-600 rounded-3xl"
                onClick={handleBuyNow}
            >
                Buy Now
            </button>
        </div>
    );
}

function ProductCard({ product, onAddOrder }) {
    const { name, image, description, weight, dimension, quantity } = product;
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleQuantityChange = (newQuantity) => {
        setSelectedQuantity(newQuantity);
    };

    return (
        <div className="h-96 flex shadow-xl text-black flex-col items-start overflow-hidden w-[300px] product-card rounded-2xl bg-slate-200">
            <div className="shadow-md rounded-2xl bg-white w-[300px] h-[150px] object-cover flex justify-center">
                <img
                    src={image}
                    alt={name}
                    style={{ width: "300px", height: "160px" }}
                    className="shadow-md rounded-2xl"
                />
            </div>
            <h3 className="px-2 pt-4 pb-2 text-xl">{name}</h3>
            <p className="px-2 py-2 text-xs ">{description}</p>
            <p className="px-2 py-1">
                <span className=" text-slate-500">Weight: </span>
                {weight}
            </p>
            <p className="px-2 py-1 ">
                <span className=" text-slate-500">Dimensions: </span>
                {dimension}
            </p>
            <AddOrder
                product={product}
                quantity={selectedQuantity}
                onQuantityChange={handleQuantityChange}
                onAddOrder={onAddOrder}
            />
        </div>
    );
}

const Page = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddOrder = (newOrder) => {
        // Update UI or any other necessary action after adding the order
        console.log("Order added:", newOrder);
    };

    return (
        <main className="flex flex-col w-full px-8 pt-16 bg-slate-300">
            <h1 className="w-full my-4 text-3xl text-center text-black">
                Available Products
            </h1>
            <div className="flex flex-wrap justify-start w-full gap-8 mt-6 ">
                {products.map((product) => (
                    <ProductCard
                        key={product.orderID}
                        product={product}
                        onAddOrder={handleAddOrder}
                    />
                ))}
            </div>
        </main>
    );
};

export default Page;
