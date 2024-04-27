"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AddProductCard({ onAddProduct }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png"
    );
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [dimension, setDimensions] = useState("");

    const handleAddProduct = async () => {
        const newProduct = {
            name,
            image,
            description,
            weight,
            dimension,
        };
        try {
            // Make API call to add product
            const response = await axios.post("/api/product_add", {
                name,
                description,
                image,
                weight,
                dimension,
            });

            // Reset form fields and show success message

            // setSuccessMessage(response.data.message);
            setName("");
            setImage("");
            setDescription("");
            setWeight("");
            setDimensions("");

            // Call the onAddProduct callback function
            onAddProduct(newProduct);
        } catch (error) {
            // setError("An error occurred while adding the product.");
            console.error(error);
        } finally {
            // setIsLoading(false);
        }

        onAddProduct(newProduct);
        // Reset input fields after adding the product
    };

    return (
        <div className="h-96 flex shadow-xl text-black flex-col items-start overflow-hidden w-[300px] product-card rounded-2xl bg-slate-200">
            <div className="shadow-md rounded-2xl bg-white w-[300px] h-[150px] object-cover flex justify-center">
                <img
                    src={image}
                    alt={name}
                    style={{ width: "120px", height: "120px" }}
                />
            </div>
            <input
                type="image link"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image Link"
                className="w-full px-2 pt-4 pb-2 text-lg bg-transparent outline-none"
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className="w-full px-2 pt-4 pb-2 text-xl bg-transparent outline-none"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full h-20 px-2 py-2 text-xs bg-transparent outline-none"
            />
            <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight"
                className="w-full px-2 py-1 bg-transparent outline-none"
            />
            <input
                type="text"
                value={dimension}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="Dimensions"
                className="w-full px-2 py-1 bg-transparent outline-none"
            />
            <button
                className="self-center px-4 py-2 mt-auto mb-4 text-white bg-blue-600 rounded-3xl"
                onClick={handleAddProduct}
            >
                Add Product
            </button>
        </div>
    );
}

function ProductCard({ product }) {
    const { name, image, description, weight, dimension } = product;

    return (
        <BackgroundGradient className=" h-96 flex shadow-xl text-black flex-col items-start overflow-hidden w-[300px] product-card rounded-2xl bg-slate-200">
            <img
                src={image}
                alt={name}
                style={{ width: "300px", height: "240px" }}
                className="shadow-md rounded-2xl"
            />
            <h3 className="px-2 pt-4 pb-2 text-xl">{name}</h3>
            <p className="px-2 py-2 text-xs ">{description}</p>
            <p className="px-2 py-1">
                {" "}
                <span className=" text-slate-500">Weight: </span>
                {weight}
            </p>
            <p className="px-2 py-1 ">
                <span className=" text-slate-500">Dimensions: </span>
                {dimension}
            </p>
        </BackgroundGradient>
    );
}

const page = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products"); // Make GET request to fetch products
                setProducts(response.data); // Set products state with fetched data
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    // const products = [
    //     {
    //         name: "Laptop",
    //         image: "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
    //         description: "Powerful laptop for gaming and productivity",
    //         weight: "2.5 kg",
    //         dimension: "15 x 10 x 1 inches",
    //     },
    //     {
    //         name: "Smartphone",
    //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0w63gyMiU1Zvu96xkMi5RFJK7e1PR_hCx904vF10UQ&s",
    //         description: "High-performance smartphone with advanced features",
    //         weight: "0.2 kg",
    //         dimension: "6 x 3 x 0.3 inches",
    //     },
    //     {
    //         name: "Headphones",
    //         image: "https://cdn.mos.cms.futurecdn.net/fsDKHB3ZyNJK6zMpDDBenB.jpg",
    //         description: "Wireless headphones with noise-cancellation",
    //         weight: "0.3 kg",
    //         dimension: "8 x 6 x 3 inches",
    //     },
    //     {
    //         name: "Camera",
    //         image: "https://cdn.mos.cms.futurecdn.net/Ekc54rx2YMgRt5ycD5KYf5.jpg",
    //         description: "Professional DSLR camera with 4K video recording",
    //         weight: "1.2 kg",
    //         dimension: "7 x 5 x 4 inches",
    //     },

    //     {
    //         name: "Laptop",
    //         image: "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
    //         description: "Powerful laptop for gaming and productivity",
    //         weight: "2.5 kg",
    //         dimension: "15 x 10 x 1 inches",
    //     },
    //     {
    //         name: "Laptop",
    //         image: "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
    //         description: "Powerful laptop for gaming and productivity",
    //         weight: "2.5 kg",
    //         dimension: "15 x 10 x 1 inches",
    //     },
    // ];

    const handleAddProduct = (newProduct) => {
        // Call your add product API endpoint here
        // After successfully adding the product, update the products state
        // setProducts([...products, newProduct]);
    };

    return (
        <main className="flex flex-col w-full px-8 pt-16 bg-slate-300">
            <h1 className="w-full my-4 text-3xl text-center text-black">
                My Products
            </h1>
            <div className="flex flex-wrap justify-start w-full gap-8 mt-6 ">
                {products.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}{" "}
                <AddProductCard onAddProduct={handleAddProduct} />
            </div>
        </main>
    );
};
export default page;
