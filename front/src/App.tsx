import { Toaster } from "@/components/ui/toaster";
import GuestLayout from "./layouts/GuestLayout";

function App() {
    /* TODO : Gérer dynamiquement l'affichage du bon layout en fonction de l'authentification */
    return (
        <>
            <GuestLayout />
            <Toaster />
        </>
    );
}

export default App;
