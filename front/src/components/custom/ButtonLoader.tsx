import { Button } from "../ui/button";
import clsx from "clsx";
import { forwardRef } from "react";

type ButtonLoaderProps = {
    variant:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | null
        | undefined;
};

const ButtonLoader = forwardRef<HTMLButtonElement, ButtonLoaderProps>(
    ({ variant }, ref) => {
        return (
            <Button
                className="relative"
                disabled
                variant={variant}
                data-testid="loading-button"
                ref={ref}
            >
                <div
                    className={clsx(
                        "inline-block h-4 w-4 animate-spin rounded-full mr-2",
                        "border-[2.5px] border-solid border-current border-e-transparent",
                        "align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]",
                        "dark:text-white",
                    )}
                    role="status"
                >
                    <span
                        className={clsx(
                            "!absolute !-m-px !h-px !w-px !overflow-hidden",
                            "!whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]",
                        )}
                    >
                        Chargement...
                    </span>
                </div>
                Chargement...
            </Button>
        );
    }
);

// Ajoutez un displayName pour une meilleure débogage
ButtonLoader.displayName = "ButtonLoader";

export default ButtonLoader;