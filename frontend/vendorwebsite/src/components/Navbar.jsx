"use client";

import { signOut } from "firebase/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Logout from "./logout";

const Navbar = () => {
    const { data: session, status } = useSession();
    return (
        <div className="z-50 flex flex-row  items-center justify-between w-full h-16  text-sm lg:flex border-b-[0.5px] border-zinc-800 fixed bg-[#020617]">
            <Link href={"/"}>
                <span className="mx-6 text-3xl font-medium ">ConSigner</span>
            </Link>
            {session ? (
                <div className="flex flex-row items-center gap-4 mx-6 text-xl md:gap-6">
                    <Link
                        href={"/"}
                        className="duration-300 hover:text-[#22D3EE]"
                    >
                        Home
                    </Link>
                    <Link
                        href={"/delivery"}
                        className="duration-300 hover:text-[#22D3EE]"
                    >
                        Delivery
                    </Link>
                    <Link
                        href={"/products"}
                        className="duration-300 hover:text-[#22D3EE]"
                    >
                        My Products
                    </Link>
                    <Link
                        href={"/arrange"}
                        className="duration-300 hover:text-[#22D3EE]"
                    >
                        Arrange
                    </Link>

                    <Logout />
                </div>
            ) : (
                <div>
                    <Link
                        href={"/login"}
                        className="px-4 py-2 mr-6 duration-300 bg-[#22D3EE] rounded-xl hover:text-[#22D3EE]"
                    >
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
