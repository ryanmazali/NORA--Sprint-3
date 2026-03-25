import { Outlet } from "react-router";
import { Navbar } from "../../Navbar/Navbar";
import { Footer } from "../../Footer/Footer";

function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;