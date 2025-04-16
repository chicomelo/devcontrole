import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from '@/lib/prisma'


export async function PATCH( request: Request ){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return NextResponse.json({ error: "Not authorized" }, {status: 401})
    }

    // pega id da request
    const { id } = await request.json()

    // busca por ticket com esse id
    const findTicket = await prismaClient.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    // caso nao encontre o ticket, retorna erro
    if(!findTicket){
        return NextResponse.json({ error: "Faled update ticket" }, {status: 400})
    }

    // update status do ticket encontrado
    try{

        await prismaClient.ticket.update({
            where:{
                id: id as string
            },
            data:{
                status: "FECHADO"
            }
        })

        return NextResponse.json({ message: "Chamado atualizado com sucesso" })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Faled update ticket" }, {status: 400})
    }
}


export async function POST( request: Request ){
    const { customerId, name, description } = await request.json();

    if(!customerId || !name || !description){
        return NextResponse.json({error: "Failed to create new ticket", status: 400})
    }

    try{

        await prismaClient.ticket.create({
            data: {
                name: name,
                description: description,
                status: "ABERTO",
                customerId: customerId
            }
        })

        return NextResponse.json({message: "Chamado cadastrado com sucesso"})

    } catch(err){
        return NextResponse.json({error: "Failed to create new ticket", status: 400})
    }

    return NextResponse.json({ message: "Cadastrado com sucesso"})
}