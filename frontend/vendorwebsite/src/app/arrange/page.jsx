"use client";

import React, { useState } from "react";
import axios from "axios";

function App() {
    const [boxes, setBoxes] = useState([]);
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [totalBoxesCount, setTotalBoxesCount] = useState(0);
    const [containerLength, setContainerLength] = useState("");
    const [containerWidth, setContainerWidth] = useState("");
    const [containerHeight, setContainerHeight] = useState("");

    const handleAddBox = () => {
        const newBox = {
            length: parseFloat(length),
            width: parseFloat(width),
            height: parseFloat(height),
            // weight: parseFloat(weight), // Include weight in the new box object
        };
        const newBoxes = [...boxes];
        for (let i = 0; i < quantity; i++) {
            newBoxes.push(newBox);
        }
        setBoxes(newBoxes);
        setTotalBoxesCount(newBoxes.length); // Update total boxes count
    };

    const sendDataToBackend = async () => {
        const url = process.env.NEXT_PUBLIC_Backend_address;
        // Create a payload object containing the required data
        const payload = {
            boxesJSON: boxes,
            boxCBM: calculateBoxCBM(boxes),
            noOfBoxes: totalBoxesCount,
            containerDimensions: {
                length: parseFloat(containerLength),
                width: parseFloat(containerWidth),
                height: parseFloat(containerHeight),
            },
        };

        console.log(payload);

        try {
            const response = await axios.post(
                `${url}/package-optimize`,
                payload
            );
            console.log("Sending data to backend...");
            console.log("Data sent successfully:", response.data);
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    // Function to calculate the total CBM (Cubic Meter) of all boxes
    const calculateBoxCBM = (boxes) => {
        return boxes.reduce((acc, box) => {
            return acc + (box.length * box.width * box.height) / 1000000; // Convert to cubic meters
        }, 0);
    };

    return (
        <div className="flex flex-col items-center flex-1 w-full pt-16 bg-slate-300">
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
            <div className="w-full h-1 my-4 bg-slate-400"></div>
            <div className="flex flex-row items-center gap-2">
                <h2 className="my-6 text-3xl text-black">Added Boxes:</h2>
                <div
                    className="px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer"
                    onClick={sendDataToBackend}
                >
                    Generate Arrangements
                </div>
            </div>
            <div className="flex flex-row gap-2 text-black">
                <div className="flex flex-col px-2 py-2 border">
                    <label>Container Length:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={containerLength}
                        onChange={(e) => setContainerLength(e.target.value)}
                    />
                </div>
                <div className="flex flex-col px-2 py-2 border">
                    <label>Container Width:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={containerWidth}
                        onChange={(e) => setContainerWidth(e.target.value)}
                    />
                </div>
                <div className="flex flex-col px-2 py-2 border">
                    <label>Container Height:</label>
                    <input
                        className="w-24 mt-2 rounded-md"
                        type="number"
                        value={containerHeight}
                        onChange={(e) => setContainerHeight(e.target.value)}
                    />
                </div>
            </div>
            <ul>
                {boxes.map((box, index) => (
                    <li
                        className="w-full px-4 py-4 text-black border-[0.5px] my-4 rounded-2xl border-slate-500"
                        key={index}
                    >
                        {`Box ${index + 1}: Length - ${box.length}, Width - ${
                            box.width
                        }, Height - ${box.height} `}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
