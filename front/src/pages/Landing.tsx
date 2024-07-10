import FormUrl from "@/components/landing/FormUrl";
import ListUrl from "../components/landing/ListUrl";
import { Separator } from "@/components/ui/separator";

export default function Landing() {
    return (
        <div className="pt-12 space-y-14 flex flex-col justify-center items-center">
            <section className="text-center space-y-6">
                <h1 className="text-6xl font-bold">
                    Le Monitoring <br />à portée{" "}
                    <span className="underline underline-offset-8 text-primary">d'un</span>{" "}
                    Clic
                </h1>
                <h2>
                    Suivez{" "}
                    <span className="underline underline-offset-8 text-primary">
                        l'état de santé
                    </span>{" "}
                    de n'importe quelle{" "}
                    <span className="underline underline-offset-8 text-primary">URL</span>{" "}
                    sans effort.
                </h2>
            </section>
            <section className="w-full max-w-xl mx-auto">
                <FormUrl />
            </section>
            <Separator className="w-full max-w-6xl" />
            <section className="w-full max-w-6xl mx-auto">
                <ListUrl />
            </section>
        </div>
    );
}
