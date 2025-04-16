'use client'

import { FiCheckSquare, FiFile } from "react-icons/fi";
import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";


interface TicketItemProps{
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps){

    const router = useRouter()
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext)


    async function handleChangeStatus(){
        try{
            await api.patch("/api/ticket", {
                id: ticket.id
            })
            router.refresh()
        } catch (err) {
            console.log(err)
        }
    }

    function handleOpenModal(){
        handleModalVisible()
        setDetailTicket({
            customer: customer,
            ticket: ticket
        })
    }

    return(
        <>
            <tr className="border-b-1 border-b-slate-200 h-16
                last:border-0 bg-slate-50 hover:bg-gray-100 duration-300">
                <td className="text-left pl-2">
                    {customer?.name}
                </td>
                <td className="text-left hidden sm:table-cell">
                    {ticket.created_at?.toLocaleDateString("pt-br")}
                </td>
                <td className="text-left">
                    <span className="bg-green-600 px-4 py-1 rounded text-white text-[13px]">
                        {ticket?.status}
                    </span>
                </td>
                <td className="text-left">
                    <button 
                        className="mr-4 cursor-pointer"
                        onClick={handleChangeStatus}
                    >
                        <FiCheckSquare size={24} color="#646870" />
                    </button>
                    <button 
                        className="cursor-pointer"
                        onClick={handleOpenModal}
                    >
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}