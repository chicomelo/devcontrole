"use client"

import { ModalContext } from "@/providers/modal"
import { MouseEvent, useContext, useRef } from "react"
import { FiX } from "react-icons/fi"

export function ModalTicket(){

    const { handleModalVisible, ticket } = useContext(ModalContext)

    const modalRef = useRef<HTMLDivElement | null>(null)

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            handleModalVisible();
        }
    }

    return(
        <div onClick={handleModalClick} className="absolute bg-gray-900/80 w-full min-h-screen">
            <div className="absolute inset-0 flex items-center  justify-center">

                <div ref={modalRef} className="bg-white shadow-lg 
                    w-8/9 md:w-1/2 max-w-2xl rounded-2xl p-6 text-sm">

                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-xl md:text-2xl text-black">Detalhes do chamado</h1>
                        <button
                            onClick={handleModalVisible}
                            className="cursor-pointer bg-red-500 hover:bg-red-600 duration-300 p-1.5 text-white rounded-lg">
                            <FiX size={21} />
                        </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2 ">
                        <h2 className="font-bold text-slate-700">Nome:</h2>
                        <p className="text-slate-600">{ticket?.ticket.name}</p>
                    </div>
                    <div className="flex flex-wrap flex-col gap-2 mb-2">
                        <h2 className="font-bold text-slate-700">Descrição:</h2>
                        <p className="text-slate-600">{ticket?.ticket.description}</p>
                    </div>

                    <div className="w-full border-b-[1px] border-slate-200 my-4"></div>

                    <h1 className="font-bold text-lg mb-4">Cliente:</h1>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-bold text-slate-700">Nome:</h2>
                        <p className="text-slate-600">{ticket?.customer?.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-bold text-slate-700">E-mail:</h2>
                        <p className="text-slate-600">{ticket?.customer?.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="font-bold text-slate-700">Telefone:</h2>
                        <p className="text-slate-600">{ticket?.customer?.phone}</p>
                    </div>

                    {
                        ticket?.customer?.adress && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                <h2 className="font-bold text-slate-700">Endereço</h2>
                                <p className="text-slate-600">{ticket.customer.adress}</p>
                            </div>
                        )
                    }


                </div>

            </div>
        </div>
    )
}