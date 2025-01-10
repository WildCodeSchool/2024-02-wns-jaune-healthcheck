import FormUrl from "@/components/landing/FormUrl";
import ListUrl from "../components/landing/ListUrl";
import { Separator } from "@/components/ui/separator";
import { SubscriptionList } from "@/components/landing/SubscriptionList.tsx";

export default function Landing() {
    return (
        <div className="pt-8 pb-10 space-y-14 flex flex-col justify-center items-center">
            <section className="text-center space-y-6">
                <h1 className="text-4xl xs:text-3xl sm:text-5xl md:text-6xl font-bold">
                    Le Monitoring <br />à portée{" "}
                    <span className="underline underline-offset-8 text-primary">
                        d'un
                    </span>{" "}
                    Clic
                </h1>
                <h2>
                    Suivez{" "}
                    <span className="underline underline-offset-8 text-primary">
                        l'état de santé
                    </span>{" "}
                    de n'importe quelle{" "}
                    <span className="underline underline-offset-8 text-primary">
                        URL
                    </span>{" "}
                    sans effort.
                </h2>
            </section>

            <section className="w-full max-w-xl mx-auto">
                <FormUrl />
            </section>

            <Separator className="w-full max-w-6xl" />

            <section className="w-full max-w-6xl mx-auto space-y-14">
                <section className="text-center space-y-6">
                    <h1 className="text-4xl xs:text-3xl sm:text-5xl md:text-6xl font-bold">
                        Plein d'URL{" "}
                        <span className="underline underline-offset-8 text-primary">
                            publiques
                        </span>
                        <br /> ajoutée par la communauté .
                    </h1>
                    <h2>
                        Vous ne la{" "}
                        <span className="underline underline-offset-8 text-primary">
                            trouvez pas
                        </span>
                        , et bien{" "}
                        <span className="underline underline-offset-8 text-primary">
                            ajoutez la
                        </span>
                        .
                    </h2>
                </section>
                <ListUrl />
            </section>

            <Separator className="w-full max-w-6xl" />

            <section className="w-full max-w-6xl mx-auto space-y-14">
                <section className="text-center space-y-6">
                    <h1 className="text-4xl xs:text-3xl sm:text-5xl md:text-6xl font-bold">
                        Rejoignez-nous <br/>
                        et bénéficiez de{" "}
                        <span className="underline underline-offset-8 text-primary">
                            précieux
                        </span>{" "}
                        avantages.
                    </h1>
                    <h2>
                        Débloquez{" "}
                        <span className="underline underline-offset-8 text-primary">
                            automatiquement
                        </span>{" "}
                        la formule{" "}
                        <span className="underline underline-offset-8 text-primary">
                            Basique
                        </span>{" "}
                        en un clic.
                    </h2>
                </section>
                <SubscriptionList/>
            </section>
        </div>
    );
}
