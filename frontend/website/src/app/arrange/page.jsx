"use client";

import React, { useState } from "react";

function App() {
    const [boxes, setBoxes] = useState([]);
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleAddBox = () => {
        const newBox = {
            length: parseFloat(length),
            width: parseFloat(width),
            height: parseFloat(height),
            weight: parseFloat(weight),
        };
        const newBoxes = [...boxes];
        for (let i = 0; i < quantity; i++) {
            newBoxes.push(newBox);
        }
        setBoxes(newBoxes);
    };

    return (
        <div className="flex flex-col items-center w-full h-screen pt-16 bg-slate-300">
            <h1 className="my-6 text-3xl text-black ">Add Boxes</h1>
            <div className="flex flex-row gap-2 text-black">
                <div className="flex flex-col px-2 py-2 border">
                    <label>Length:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </div>
                <div className="flex flex-col px-2 py-2 border">
                    <label>Width:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </div>
                <div className="flex flex-col px-2 py-2 border">
                    <label>Height:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <div className="flex flex-col px-2 py-2 border">
                    <label>Weight:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div className="flex flex-col px-2 py-2 border">
                    <label>Quantity:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <button
                    className="px-4 py-2 text-white bg-blue-600 rounded-md"
                    onClick={handleAddBox}
                >
                    Add Box
                </button>
            </div>
            <div></div>
            <h2 className="my-6 text-3xl text-black ">Added Boxes:</h2>
            <ul>
                {boxes.map((box, index) => (
                    <li key={index}>
                        {`Box ${index + 1}: Length - ${box.length}, Width - ${
                            box.width
                        }, Height - ${box.height}, Weight - ${box.weight}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
