import { FaGithub, FaLinkedin } from "react-icons/fa";  

interface TeamCardProps {   
    nome: string;   
    rm: string;   
    turma: string;   
    foto: string;   
    github: string;   
    linkedin: string; 
}  

export const TeamCard = ({ nome, rm, turma, foto, github, linkedin }: TeamCardProps) => { 
    return (     
        <div className=
                "bg-white text-center shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-[5px] p-10 mobile:p-[40px] tablet:p-[50px]"
        >      
            <img        
                src={foto}        
                alt={`Foto de ${nome}`}        
                className="w-[250px] h-[250px] rounded-full object-cover mb-4 border-[3px] border-[#b0d6f5] mx-auto mobile:w-[180px] mobile:h-[180px] tablet:w-[220px] tablet:h-[220px]"      
            />      
            <h2 className="text-[1.2rem] font-semibold text-[#222] mb-1">{nome}</h2>      
            <p className="text-[0.9rem] text-[#555] mb-1">RM: {rm}</p>      
            <p className="text-[0.9rem] text-[#555] mb-4">Turma: {turma}</p>      
        <div className="flex justify-center gap-3">        
            <a 
                href={github} 
                target="_blank"     
                rel="noreferrer" 
                className="transition-transform duration-200 hover:scale-[1.15]"
            >          
                <FaGithub size={48} className="text-[#222]" />        
            </a>        
            <a 
                href={linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="transition-transform duration-200 hover:scale-[1.15]"
            >          
                <FaLinkedin size={48} className="text-[#0a66c2]" />        
            </a>      
        </div>    
    </div>   
);};