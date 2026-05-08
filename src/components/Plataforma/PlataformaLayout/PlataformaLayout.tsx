// src/components/Layouts/PlataformaLayout/PlataformaLayout.tsx

import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../Topbar/Topbar";

function PlataformaLayout() {
    const [sidebarAberta, setSidebarAberta] = useState(false);

    return (
        <div className="flex h-screen bg-[#f4f7fa] overflow-hidden">

            {/* Overlay mobile/tablet */}
            {sidebarAberta && (
                <div
                className="fixed inset-0 bg-black/40 z-[40] desktop:hidden"
                onClick={() => setSidebarAberta(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                aberta={sidebarAberta}
                onFechar={() => setSidebarAberta(false)}
            />

            {/* Área principal */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

                {/* TopBar — só aparece abaixo de desktop */}
                <TopBar onAbrirSidebar={() => setSidebarAberta(true)} />

                {/* Conteúdo da página */}
                <main className="flex-1 overflow-y-auto p-4 desktop:p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default PlataformaLayout;