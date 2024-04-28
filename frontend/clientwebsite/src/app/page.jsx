"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { LampContainer } from "@/components/ui/lamp";
import { useSession } from "next-auth/react";
import ThisCantBeReached from "@/components/thisSiteCanBeReached/site-reach";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    const [showThisCantBeReached, setShowThisCantBeReached] = useState(true);
    setTimeout(() => {
        setShowThisCantBeReached(false);
    }, 5400);
    return (
        <>
            {showThisCantBeReached ? (
                <ThisCantBeReached />
            ) : (
                <main className="flex flex-col items-center min-h-screen bg-zinc-300 ">
                    {/* <div className="relative flex justify-center w-full bg-blue-950">
                <Image
                    className=""
                    width={500}
                    height={300}
                    src="/truck1.png"
                ></Image>
                <p className="absolute text-3xl bottom-12 ">
                    Your Delivery, Your Way.
                </p>
            </div> */}
                    <LampContainer>
                        <motion.h1
                            initial={{ opacity: 0.5, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.8,
                                ease: "easeInOut",
                            }}
                            className="py-4 mt-8 text-4xl font-medium tracking-tight text-center text-transparent bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text md:text-7xl"
                        >
                            Your Delivery,
                            <br /> Your Way.
                        </motion.h1>
                    </LampContainer>
                </main>
            )}
        </>
    );
}
