import FormUrl from "@/components/landing/FormUrl";
import ListUrl from "../components/landing/ListUrl";

export default function Landing() {
    return (
        <div className="space-y-8 h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-center">Health-checker</h1>
            <section className="w-1/3 mx-auto">
                <FormUrl />
            </section>
            <section className="w-2/3 mx-auto">
                <ListUrl />
            </section>
        </div>
    );
}
