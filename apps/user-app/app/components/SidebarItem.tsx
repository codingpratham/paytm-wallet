"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title }: { href: string; title: string; }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className={` font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}