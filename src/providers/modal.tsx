"use client"

import { createContext, ReactNode, useState } from "react"
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"
import { boolean } from "zod"
import { ModalTicket } from "@/components/modal"

interface ModalContextData{
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfoProps | undefined;
    setDetailTicket: (detail: TicketInfoProps) => void;
}

interface TicketInfoProps{
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({children}: {children: ReactNode}) => {

    const [visible, setVisible] = useState(false)
    
    const [ticket, setTicket] = useState<TicketInfoProps>()

    function handleModalVisible(){
        setVisible(!visible)
    }

    function setDetailTicket( detail: TicketInfoProps){
        setTicket(detail)
    }

    return(
        <ModalContext.Provider value={{ 
                visible, 
                handleModalVisible,
                ticket,
                setDetailTicket
            }}>
            {visible && <ModalTicket />}
            {children}
        </ModalContext.Provider>
    )
}