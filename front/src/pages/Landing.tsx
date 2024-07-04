import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Landing() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1 className="font-bold">
                Hello there ! Welcome to the Health-checker
            </h1>
            <div>
                <Button
                    variant="default"
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is {count}
                </Button>
            </div>
        </>
    );
}
