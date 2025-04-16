import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma"

export default async function NewCustomer(){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect('/')
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleNewTicket(formData: FormData){
        'use server'

        const name = formData.get('name')
        const description = formData.get('description')
        const customerId = formData.get('customer')

        if(!name || !description || !customerId){
            return
        }

        await prismaClient.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id
            }
        })

        redirect("/dashboard")

    }

    return(
        <Container>
            <main className="flex flex-col mt-10 mb-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="bg-slate-500 hover:bg-slate-700 duration-300 px-4 py-1 text-white rounded">Voltar</Link>
                    <h1 className="text-3xl font-bold">Novo Chamado</h1>
                </div>

                <form className="mt-6 flex flex-col" action={handleNewTicket}>
                    <label className="mb-1 font-medium">Nome</label>
                    <input 
                        name="name"
                        type="text"
                        placeholder="Digite o nome do chamado"
                        required
                        className="
                            text-slate-700
                            border-1 border-gray-300 
                            rounded-md h-11 px-2"
                    />

                    <label className="mb-1 font-medium mt-4">Descreve o problema</label>
                    <textarea 
                        placeholder="Digite o nome do chamado"
                        required
                        name="description"
                        className="
                            text-slate-700
                            border-1 border-gray-300 
                            rounded-md h-32 py-2 px-2 mb-4 resize-none"
                    ></textarea>

                    {
                        customers.length !== 0 && (
                            <>
                                <label className="mb-1 font-medium">Selecione o cliente</label>
                                <select 
                                    required
                                    name="customer"
                                    className="w-full border-1 border-gray-300 rounded-md px-2 mb-2 h-11 bg-white">
                                    <option value="">Selecione o cliente</option>
                                    
                                    {customers.map( customer => (
                                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                                    ))}
                                </select>

                                
                            </>
                        )
                    }

                    {
                        customers.length === 0 && (
                            <Link href="/dashboard/customer/new">
                                Você ainda não tem nenhum cliente. <span className="text-blue-500 font-medium">Cadastrar cliente</span>
                            </Link>
                        )
                    }

                    <button 
                        type="submit"
                        disabled={customers.length === 0}
                        className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-6 py-2 rounded my-4 self-start cursor-pointer
                        disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Cadastrar
                    </button>


                </form>

            </main>

        </Container>
    )
}