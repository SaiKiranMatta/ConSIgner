"use client";

import { signOut } from "firebase/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    const { data: session, status } = useSession();
    return (
        <div className="z-10 flex flex-row items-center justify-between w-full h-16 font-mono text-sm lg:flex border-b-[0.5px] border-zinc-800">
            <span className="mx-6 text-3xl font-semibold">ConSigner</span>
            {session ? (
                <div className="flex flex-row items-center gap-4 mx-6 text-xl md:gap-6">
                    <Link
                        href={"/"}
                        className="duration-300 hover:text-blue-800"
                    >
                        Home
                    </Link>
                    <Link
                        href={"/delivery"}
                        className="duration-300 hover:text-blue-800"
                    >
                        Delivery
                    </Link>
                    <Link
                        href={"/"}
                        className="duration-300 hover:text-blue-800"
                    >
                        Home
                    </Link>
                    <Link
                        href={"/"}
                        className="duration-300 hover:text-blue-800"
                    >
                        Home
                    </Link>

                    <div
                        onClick={signOut}
                        className="px-4 py-2 mr-6 duration-300 bg-blue-800 border border-blue-800 rounded-xl hover:text-blue-800 hover:bg-transparent"
                    >
                        Logout
                    </div>
                </div>
            ) : (
                <div>
                    <Link
                        href={"/login"}
                        className="px-4 py-2 mr-6 duration-300 bg-blue-800 rounded-xl hover:text-blue-800"
                    >
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
