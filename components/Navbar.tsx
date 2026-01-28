'use client'

import React from 'react'
import {usePathname} from "next/dist/client/components/navigation";
import {useAuth, UserButton} from "@clerk/nextjs";
import {Bell} from "lucide-react";

const Navbar = () => {

    const user=useAuth();

    const formatPathName =():string=>{
        const pathname=usePathname();

        if(!pathname) return "Overview";

        const splitRoute=pathname.split("/");
        const lastIndex = splitRoute.length-1 > 2 ? 2 : splitRoute.length-1;

        const pathName = splitRoute[lastIndex];

        const formattedPath = pathName.replace(/-/g,"");

        return formattedPath;
    }

    const path=formatPathName();

    return (
        <>
            <div className="p-5 flex justify-between bg-white">
                <h1>
                    {path || "Overview"}
                </h1>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell/>
                        <p className="absolute -top-2 -right-1 size-4 bg-red-600 text-white rounded-full text-[10px] text-center">
                            2
                        </p>
                    </div>

                    {user?.userId && <UserButton/>}
                </div>
            </div>
        </>
    )
}
export default Navbar;
