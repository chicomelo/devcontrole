import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "../components/form";

export default async function NewCustomer(){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect('/')
    }

    return(
        <Container>
            <main className="flex flex-col mt-10 mb-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/customer" className="bg-slate-500 hover:bg-slate-700 duration-300 px-4 py-1 text-white rounded">Voltar</Link>
                    <h1 className="text-3xl font-bold">Novo Cliente</h1>
                </div>

                <NewCustomerForm userId={session.user.id} />

            </main>

        </Container>
    )
}