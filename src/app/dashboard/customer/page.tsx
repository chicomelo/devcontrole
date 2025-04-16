import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import prismaClient from "@/lib/prisma"


export default async function Customer(){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect('/')
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    return(
        <Container>
            <main className="mt-10 mb-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus Clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-6 py-2 rounded">Novo Cliente</Link>
                </div>

                <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        customers.map( customer => (
                            <CardCustomer key={customer.id} customer={customer} />
                        ))
                    }
                </section>
                {
                    customers.length === 0 && (
                        <p className="text-gray-500">
                            Você ainda não possui nenhum cliente.
                        </p>
                    )
                }
            </main>
        </Container>
    )
}