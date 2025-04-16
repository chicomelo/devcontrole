"use client"

import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
    const { status, data } = useSession()

    async function handleLogin() {
        // Modificação principal: força o provider "google" e define callbackUrl
        await signIn("google", { 
            callbackUrl: "/dashboard", // Redireciona para /dashboard após login
            redirect: true // Garante o redirecionamento
        })
    }

    async function handleLogout() {
        await signOut({ callbackUrl: "/" }) // Redireciona para home após logout
    }

    return(
        <header className="
            w-full h-20 bg-white
            flex items-center 
            shadow-sm
        ">
            <div className="
                w-full flex items-center justify-between
                max-w-7xl mx-auto px-4
            ">
                <Link href="/">
                    <h1 className="font-bold text-2xl">
                        <span className="text-blue-500">DEV</span>
                        Controle
                    </h1>
                </Link>

                {status === "loading" && (
                    <button className="animate-spin">
                        <FiLoader size={24} color="#4b5563" />
                    </button>
                )}

                {status === "unauthenticated" && (
                    <button 
                        onClick={handleLogin}
                        className="flex items-center gap-2 hover:text-blue-500 duration-300 cursor-pointer"
                    >
                        <FiLock size={20} />
                        <span className="hidden sm:inline">Entrar</span>
                    </button>
                )}

                {status === "authenticated" && (
                    <div className="flex items-center gap-6">
                        <Link 
                            href="/dashboard"
                            className="flex items-center gap-2 hover:text-blue-500 duration-300"
                        >
                            <FiUser size={20} />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
    
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 hover:text-blue-500 duration-300 cursor-pointer"
                        >
                            <FiLogOut size={20} />
                            <span className="hidden sm:inline">Sair</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}