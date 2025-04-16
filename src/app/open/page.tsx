"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/input"
import { FiSearch, FiX } from "react-icons/fi"
import { useState } from "react"
import { FormTicket } from "./components/FormTicket"
import { api } from "@/lib/api"

const schema = z.object({
    email: z.string().email("Digite o e-mail para localizar o cliente").min(1, "O campo e-mail é obrigatório")
})

type FormData = z.infer<typeof schema>

export interface CustomerDataInfo {
    id: string;
    name: string;
}

export default function OpenTicket(){

    const { register, handleSubmit, setValue, setError, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null)

    function handleClearCustomer(){
        setCustomer(null)
        setValue("email", "")
    }

    async function handleSearchCustomer(data: FormData){
        const response = await api.get("/api/customer", {
            params: {
                email: data.email
            }
        })

        if(response.data === null){
            setError("email", { type: "custom", message: "Ops, o cliente não foi encontrado"})
            return
        }

        setCustomer({
            id: response.data.id,
            name: response.data.name
        })
    }

    return(
        <div className="w-full max-w-2xl mx-auto px-2 pt-16">
            <h1 className="font-bold text-3xl text-center">Abrir chamado</h1>

            <main className="flex flex-col mt-10 mb-2">
                
                {customer ? (
                    <div className="bg-slate-100 py-6 px-6 rounded-lg
                        flex items-center justify-between">
                        <p className="text-lg">
                            <strong>Cliente selecionado: </strong>
                            {customer.name}
                        </p>
                        <button
                            onClick={handleClearCustomer}
                            className="h-8 w-8 rounded cursor-pointer
                            flex items-center justify-center
                           "
                        ><FiX size={24} className="text-red-500 hover:text-red-600 duration-300"/></button>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(handleSearchCustomer)} 
                        className="bg-slate-100 py-6 px-6 rounded-lg">
                        <div className="flex flex-col gap-3">
                            <Input
                                name="email"
                                placeholder="Digite o e-mail do cliente ..."
                                type="text"
                                error={errors.email?.message}
                                register={register}
                            ></Input>

                            <button

                                type="submit"
                                className="bg-blue-500 text-white h-11 rounded 
                                flex items-center justify-center gap-3 cursor-pointer
                                hover:bg-blue-600 duration-300
                                ">
                                Procurar clientes
                                <FiSearch size={24} color="#fff" />
                            </button>
                        </div>
                    </form>
                )}

                {customer !== null && (
                    <FormTicket customer={customer} />
                )}

            </main>

        </div>
    )
}