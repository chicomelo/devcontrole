"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/input"
import { error } from "console"
import { api } from "@/lib/api"
import { CustomerDataInfo } from "@/app/open/page";

const schema = z.object({
    name: z.string().min(1, "Nome do chamado é obrigatório"),
    description: z.string().min(1, "Descreva um pouco sobre seu problema...")
})

type FormData = z.infer<typeof schema>

interface FormTicketProps{
    customer: CustomerDataInfo
}

export function FormTicket({ customer }: FormTicketProps){

    const { register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(data: FormData){
        const response = await api.post("/api/ticket", {
            name: data.name,
            description: data.description,
            customerId: customer.id
        })

        setValue("name", "")
        setValue("description", "")
    }

    return(
        <form className="mt-6 bg-slate-100 px-6 py-6 rounded-lg
            flex flex-col"
            onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 font-medium">Nome do chamado</label>
            <Input
                register={register}
                type="text"
                placeholder="Digite o nome do chamado"
                name="name"
                error={errors.name?.message}
            />

            <label className="mb-1 mt-4 font-medium">Descreva o problema</label>
            <textarea className="w-full rounded-lg h-24 
                resize-none px-2 py-2 border-1
                text-slate-700 border-gray-300 "
                placeholder="Descreva seu problema..."
                id="description"
                {...register("description")}    
            >
            </textarea>
            {errors.description?.message && 
            <p className="text-red-500 my-1 text-sm">{errors.description.message}</p>}
            <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-6 py-2 rounded my-4 h-11 w-full cursor-pointer
                disabled:bg-gray-400 disabled:cursor-not-allowed">
                Cadastrar
            </button>
        </form>
    )
}