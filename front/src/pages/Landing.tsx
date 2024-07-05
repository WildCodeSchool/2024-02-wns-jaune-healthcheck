import FormUrl from "@/components/landing/FormUrl";

export default function Landing() {
    return (
        <div className="space-y-8 h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-center">Health-checker</h1>
            <section className="w-1/2 mx-auto">
                <FormUrl />
            </section>
        </div>
    );
}
