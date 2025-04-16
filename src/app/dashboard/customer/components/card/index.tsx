"use client"

import { api } from "@/lib/api"
import { CustomerProps } from "@/utils/customer.type"
import { useRouter } from "next/navigation"

export function CardCustomer( { customer } : { customer: CustomerProps }){

    const router = useRouter()

    async function handleDeleteCustomer(){
        
        try{
            await api.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            })

            router.refresh()

        } catch (err){
            console.log(err)
        }
        
    }

    return(
        <article className="flex flex-col gap-2
            border-1 border-slate-300 bg-slate-100 hover:bg-slate-200 
            rounded-lg p-4
            text-base
            duration-300">
            <p>
                <span className="font-bold">Nome: </span> {customer.name}
            </p>
            <p>
                <span className="font-bold">E-mail: </span>{customer.email}
            </p>
            <p>
                <span className="font-bold">Telefone: </span>{customer.phone}
            </p>
            <button 
                onClick={handleDeleteCustomer}
                className="bg-red-500 text-white hover:bg-red-600 duration-300 self-start
                rounded px-4 py-1 cursor-pointer text-sm">
                Excluir
            </button>
        </article>
    )
}