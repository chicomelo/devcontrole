import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader(){
    return(
        <Container>
            <header className="
                flex items-center
                bg-slate-200
                rounded-lg
                mt-6
                mb-4
                overflow-hidden
            ">
                <Link href="/dashboard" className="
                    px-4 py-3
                    text-slate-600
                    hover:bg-slate-600
                    hover:text-white
                    duration-300
                ">
                    Chamados
                </Link>
                <Link href="/dashboard/customer" className="
                    px-4 py-3
                    text-slate-600
                    hover:bg-slate-600
                    hover:text-white
                    duration-300
                ">
                    Clientes
                </Link>
            </header>
        </Container>
    )
}