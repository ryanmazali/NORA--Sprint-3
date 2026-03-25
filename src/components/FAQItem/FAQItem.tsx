import { useState } from "react"; 
import { ChevronDown, ChevronUp } from "lucide-react";  

interface FAQItemProps {   
    pergunta: string;   
    resposta: string; 
}  


export const FAQItem = ({ pergunta, resposta }: FAQItemProps) => { 

    const [aberto, setAberto] = useState(false); 

    return (     
        <div className="
            mb-4 bg-white overflow-hidden 
            shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 
            hover:-translate-y-[3px]"
        >      
            <button        
                onClick={() => setAberto(!aberto)}        
                className="
                    w-full flex justify-between items-center 
                    px-5 py-[18px] bg-[aliceblue] border-none 
                    text-left text-[1.1rem] cursor-pointer 
                    transition-colors duration-300 
                    hover:bg-[rgba(226,122,31,0.15)] 
                    mobile:text-[1rem] mobile:px-4"      
            >        
                <span>{pergunta}</span>        
                {aberto ? <ChevronUp size={20} /> : <ChevronDown size={20} />}      
            </button>      
            {aberto && (         
                <div className="
                    px-5 py-4 text-[0.95rem] leading-[1.5] 
                    text-[#333] border-t border-[#ddd]"
                >          
                    <p>{resposta}</p>        
                </div>       
            )}    
        </div>   
    )
}