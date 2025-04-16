"use client"

import { useRouter } from "next/navigation"
import { FiRefreshCcw } from "react-icons/fi"

export function ButtonRefresh(){

    const router = useRouter()
    
    return(
        <button onClick={() => router.refresh()}
            className="w-10 h-10 rounded
                flex items-center justify-center
                bg-gray-500 hover:bg-gray-600 duration-300 cursor-pointer"
        >
            <FiRefreshCcw size={21} color="#fff" />
        </button>
    )

}