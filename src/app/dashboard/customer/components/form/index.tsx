"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"


const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um e-mail válido.").min(1, "O campo e-mail é obrigatório"),
    phone: z.string().refine( (value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        "message": "Verifique o formato do telefone (XX) XXXXXXXXX"
    }),
    adress: z.string()
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm( { userId }: { userId: string}){

    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter()

    async function handleRegisterCustomer(data: FormData){
        await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            adress: data.adress,
            userId: userId
        })

        router.refresh()
        router.replace('/dashboard/customer')
    }

    return(
        <form className="mt-6 flex flex-col" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 font-medium">Nome</label>
            <Input 
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register}
            />

            <section className="flex gap-4 my-4 flex-col sm:flex-row">
                <div className="flex flex-col flex-1">
                    <label className="mb-1 font-medium">E-mail</label>
                    <Input 
                        type="email"
                        name="email"
                        placeholder="Digite o e-mail"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label className="mb-1 font-medium">Telefone</label>
                    <Input 
                        type="text"
                        name="phone"
                        placeholder="(XX) XXXXXXXXX"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>
            </section>

            <label className="mb-1 font-medium">Endereço completo</label>
            <Input 
                type="text"
                name="adress"
                placeholder="Digite o endereço"
                error={errors.adress?.message}
                register={register}
            />

            <button type="submit"
            className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-6 py-2 rounded my-4 self-start cursor-pointer">
                Cadastrar
            </button>

        </form>
    )
}