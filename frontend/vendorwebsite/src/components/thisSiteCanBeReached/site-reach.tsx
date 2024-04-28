"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ThisCantBeReached() {
    const [ShowText, setShowText] = React.useState(false);
    let CenterWidth = 0;
    let CenterHeight = 0;
    React.useEffect(() => {
        setTimeout(function () {
            setShowText(true);
        }, 1000);
    }, []);
    if (typeof window !== "undefined") {
        if (window.innerHeight > 640) {
            CenterHeight = window.innerHeight / 2 - 160 - 20;
        } else {
            CenterHeight = window.innerHeight / 2 - 64 - 20;
        }
        if (window.innerWidth > 1280) {
            CenterWidth = window.innerWidth / 2 - 384 - 18;
        } else if (window.innerWidth > 1024) {
            CenterWidth = window.innerWidth / 2 - 192 - 18;
        } else if (window.innerWidth > 768) {
            CenterWidth = window.innerWidth / 2 - 144 - 18;
        } else if (window.innerWidth > 640) {
            CenterWidth = window.innerWidth / 2 - 96 - 18;
        } else {
            CenterWidth = window.innerWidth / 2 - 16 - 18;
        }
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 4, duration: 0.5 }}
            className="absolute z-50 flex flex-col w-full h-screen px-4 py-16 space-y-5 bg-gray-900 sm:py-40 sm:px-24 md:px-36 lg:px-48 xl:px-96 sm:space-y-10"
        >
            <div className="relative flex flex-col w-full space-y-4">
                {/* Icon for Desktop and Table */}
                <motion.div
                    animate={{ y: CenterHeight, x: CenterWidth, scale: 2 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="relative h-10 w-9"
                >
                    <div className="absolute w-1/2 h-1 bg-gray-300"></div>
                    <div className="absolute w-1 h-full bg-gray-300"></div>
                    <div className="absolute bottom-0 w-full h-1 bg-gray-300"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-6 bg-gray-300"></div>

                    {/* Left Eye */}

                    <motion.div
                        animate={{
                            scaleY: [
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                            ],
                        }}
                        transition={{ scaleY: { delay: 1.5, duration: 1 } }}
                        className="absolute left-2 top-3 h-1.5 w-[3.5px] bg-gray-300"
                    ></motion.div>

                    {/* Right Eye */}
                    <motion.div
                        initial={{ opacity: 0, scaleY: "100%" }}
                        animate={{
                            opacity: 1,
                            scaleY: [
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                                "0%",
                                "100%",
                            ],
                        }}
                        transition={{
                            opacity: { delay: 1, duration: 0 },
                            scaleY: { delay: 1.5, duration: 1 },
                        }}
                        className="absolute right-2 top-3 h-1.5 w-[3.5px] bg-gray-300"
                    ></motion.div>

                    {/* Corner */}

                    <motion.div
                        animate={{ rotate: -90, x: 9, y: -7 }}
                        transition={{
                            rotate: { delay: 0.5, duration: 0.5 },
                            x: { delay: 0.5, duration: 0.5 },
                            y: { delay: 0.5, duration: 0.5 },
                        }}
                        className="absolute right-4 top-0 h-[18px] w-1 bg-gray-300"
                    ></motion.div>
                    <motion.div
                        animate={{ rotate: 90, x: 6, y: -7 }}
                        transition={{
                            rotate: { delay: 0.5, duration: 0.5 },
                            x: { delay: 0.5, duration: 0.5 },
                            y: { delay: 0.5, duration: 0.5 },
                        }}
                        className="absolute right-0 top-[14px] h-1 w-4 bg-gray-300"
                    ></motion.div>
                    <motion.div
                        initial={{ opacity: "100%" }}
                        animate={{ opacity: "0%" }}
                        transition={{ opacity: { delay: 0.5, duration: 0 } }}
                    >
                        <div className="absolute top-0 w-1 h-1 bg-gray-300 right-3"></div>
                        <div className="absolute right-0 top-[10px] h-1 w-1 bg-gray-300"></div>
                        <div className="absolute right-1 top-[7px] h-[4px] w-[4px] bg-gray-300"></div>
                        <div className="absolute right-2 top-[4px] h-[4px] w-[4px] bg-gray-300"></div>
                    </motion.div>

                    {/* Smile */}

                    <div className="absolute left-3 bottom-[10px] w-3 h-[3px] bg-gray-300"></div>
                    <motion.div
                        animate={{ y: [0, -5, 0, -5, 0, -5] }}
                        transition={{ y: { delay: 3, duration: 0.5 } }}
                        className="absolute left-[9px] bottom-[7px] w-[3px] h-[3px] bg-gray-300"
                    ></motion.div>
                    <motion.div
                        animate={{
                            y: [0, -5, 0, -5, 0, -5, 0, -5],
                        }}
                        transition={{ y: { delay: 3, duration: 0.5 } }}
                        className="absolute right-[9px] bottom-[7px] w-[3px] h-[3px] bg-gray-300"
                    ></motion.div>
                    {/* Hello animation text */}
                </motion.div>
                <motion.span
                    initial={{
                        y: CenterHeight + 50 - 20,
                        x: CenterWidth - 13,
                        opacity: 0,
                    }}
                    animate={{ y: CenterHeight + 50, opacity: 1 }}
                    transition={{ delay: 3.5, duration: 0.3 }}
                    className="absolute text-2xl font-bold text-gray-300"
                >
                    Hello!
                </motion.span>

                {/* Text start from here */}

                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ opacity: { delay: 2, duration: 0.5 } }}
                    className="flex flex-col w-full space-y-8"
                >
                    <span className="text-2xl text-gray-300 font-Header">
                        This site{" "}
                        {ShowText ? (
                            <motion.span
                                animate={{ scale: ["100%", "120%"] }}
                                transition={{
                                    scale: { delay: 4, duration: 0.5 },
                                }}
                                className="font-bold"
                            >
                                actually can
                            </motion.span>
                        ) : (
                            <span>can&apos;t</span>
                        )}{" "}
                        be reached
                    </span>
                    <span className="text-gray-400 text-md">
                        <span className="font-bold">www.consigner.com </span>
                        unexpectedly{" "}
                        {ShowText ? (
                            <motion.span
                                animate={{ scale: ["100%", "140%"] }}
                                transition={{
                                    scale: { delay: 4, duration: 1 },
                                }}
                                className="font-bold"
                            >
                                opened
                            </motion.span>
                        ) : (
                            <span>closed</span>
                        )}{" "}
                        the connection.
                    </span>
                    <div className="flex flex-col space-y-3">
                        <span className="text-lg text-gray-400 font-Header">
                            Try:
                        </span>
                        <div className="flex flex-col pl-10 space-y-2">
                            <span className="text-sm text-gray-400 text-Header font-Header sm:text-base">
                                <span className="text-gray-300 text-bold">
                                    &bull;
                                </span>{" "}
                                Checking the connection
                            </span>
                            <span className="text-sm text-blue-300 text-Header font-Header sm:text-base">
                                <span className="text-gray-300 text-bold">
                                    &bull;
                                </span>{" "}
                                Checking the proxy and the firewall
                            </span>
                            <span className="text-sm text-blue-300 text-Header font-Header sm:text-bdase">
                                <span className="text-gray-300 text-bold">
                                    &bull;
                                </span>{" "}
                                Running Windows Network Diagnostics
                            </span>
                        </div>
                    </div>
                    <span className="text-sm text-gray-400">
                        {ShowText ? (
                            <motion.span
                                animate={{ scale: ["100%", "120%"] }}
                                transition={{
                                    scale: { delay: 4, duration: 0.5 },
                                }}
                                className="font-bold"
                            >
                                SUCC_CONNECTION_OPENED
                            </motion.span>
                        ) : (
                            <span>ERR_CONNECTION_CLOSED</span>
                        )}
                    </span>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ opacity: { delay: 2, duration: 0.5 } }}
                className=""
            >
                <button className="px-4 py-2 text-sm text-white bg-blue-300 rounded sm:text-base">
                    {ShowText ? "Start" : "Reload"}
                </button>
            </motion.div>
        </motion.div>
    );
}
