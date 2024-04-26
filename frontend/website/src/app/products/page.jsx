"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import React from "react";

function ProductCard({ product }) {
    const { name, image, description, weight, dimensions } = product;

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
                {dimensions}
            </p>
        </BackgroundGradient>
    );
}

const page = () => {
    const products = [
        {
            name: "Laptop",
            image: "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
            description: "Powerful laptop for gaming and productivity",
            weight: "2.5 kg",
            dimensions: "15 x 10 x 1 inches",
        },
        {
            name: "Smartphone",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0w63gyMiU1Zvu96xkMi5RFJK7e1PR_hCx904vF10UQ&s",
            description: "High-performance smartphone with advanced features",
            weight: "0.2 kg",
            dimensions: "6 x 3 x 0.3 inches",
        },
        {
            name: "Headphones",
            image: "https://cdn.mos.cms.futurecdn.net/fsDKHB3ZyNJK6zMpDDBenB.jpg",
            description: "Wireless headphones with noise-cancellation",
            weight: "0.3 kg",
            dimensions: "8 x 6 x 3 inches",
        },
        {
            name: "Camera",
            image: "https://cdn.mos.cms.futurecdn.net/Ekc54rx2YMgRt5ycD5KYf5.jpg",
            description: "Professional DSLR camera with 4K video recording",
            weight: "1.2 kg",
            dimensions: "7 x 5 x 4 inches",
        },

        {
            name: "Laptop",
            image: "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
            description: "Powerful laptop for gaming and productivity",
            weight: "2.5 kg",
            dimensions: "15 x 10 x 1 inches",
        },
        {
            name: "Laptop",
            image: "https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg",
            description: "Powerful laptop for gaming and productivity",
            weight: "2.5 kg",
            dimensions: "15 x 10 x 1 inches",
        },
    ];

    return (
        <main className="flex flex-col w-full px-8 pt-16 bg-slate-300">
            <h1 className="w-full my-4 text-3xl text-center text-black">
                My Products
            </h1>
            <div className="flex flex-wrap justify-start w-full gap-8 mt-6 ">
                {products.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}
            </div>
        </main>
    );
};

export default page;
