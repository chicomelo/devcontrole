import { Container } from "@/components/container"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { TicketItem } from "./components/ticket"
import prismaClient from "@/lib/prisma"
import { ButtonRefresh } from "./components/button"

export default async function Dashboard(){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect('/')
    }

    const tickets = await prismaClient.ticket.findMany({
        where: {
            status: "ABERTO",
            customer:{
                userId: session.user.id
            }
        },
        include:{
            customer: true
        },
        orderBy: {
            created_at: "asc" // desc
        }
    })

    return(
        <Container>

            <main className="mt-10 mb-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <div className="flex items-center gap-2">
                        <ButtonRefresh />
                        <Link href="/dashboard/new" className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-6 py-2 rounded">Abrir chamado</Link>
                    </div>
                </div>

                { tickets.length !== 0 && (
                    <table className="min-w-full mt-6">
                        <thead>
                            <tr>
                                <th className="font-bold text-slate-600 text-left pb-4">Cliente</th>
                                <th className="font-bold text-slate-600 text-left pb-4 hidden sm:table-cell">Data cadastro</th>
                                <th className="font-bold text-slate-600 text-left pb-4">Status</th>
                                <th className="font-bold text-slate-600 text-left pb-4">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map( ticket => (
                                    <TicketItem 
                                        key={ticket.id}
                                        customer={ticket.customer}
                                        ticket={ticket}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                )}

                { tickets.length === 0 && (
                    <p className="text-gray-500 mt-10">Nenhum ticket aberto encontrado</p>
                )}

            </main>

        </Container>
    )
}