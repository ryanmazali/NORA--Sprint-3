import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#0a3d62] font-medium mt-6 mb-2 hover:text-[rgb(226,122,31)] transition-colors duration-300 cursor-pointer bg-transparent border-none"
        >
            <ArrowLeft size={20} />
            Voltar
        </button>
    );
};