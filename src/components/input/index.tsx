"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps{
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions
}

export function Input( { name, placeholder, type, register, rules, error} : InputProps){
    return(
        <>
            <input 
                className="
                text-slate-700
                border-1 border-gray-300 
                rounded-md h-11 px-2"
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                id={name}
            />
            {error && <p className="text-red-500 my-1 text-sm">{error}</p>}
        </>
    )
}