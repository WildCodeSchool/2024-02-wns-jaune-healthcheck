import { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Code } from "lucide-react";
import SyntaxWrapper from "../custom/SyntaxWrapper";
import ButtonLoader from "../custom/ButtonLoader";

type HistoryResponseModalProps = {
    statusCode: string;
    path: string;
    response: string;
    contentType: string;
};

const HistoryResponseModal: React.FC<HistoryResponseModalProps> = ({
    statusCode,
    path,
    response,
    contentType,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const formatResponse = (response: string) => {
        if (!response) return "";
        if (contentType.includes("application/json")) {
            return JSON.stringify(JSON.parse(response), null, 2);
        }
        return response;
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(isOpen) => {
                if (isOpen) {
                    startTransition(() => {
                        setIsOpen(isOpen);
                    });
                } else {
                    setIsOpen(isOpen);
                }
            }}
        >
            <DialogTrigger asChild>
                {!isPending ? (
                    <Button className="relative" variant="ghost">
                        <Code size={20} className="me-2" />
                        Aperçu réponse
                    </Button>
                ) : (
                    <ButtonLoader variant="ghost" />
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[60%]">
                <DialogTitle className="-mb-4">{statusCode}</DialogTitle>
                <DialogDescription>{path}</DialogDescription>
                <div 
                    className="overflow-y-auto overflow-x-auto max-h-[80vh] whitespace-pre-line custom-scrollbar"
                >
                    <SyntaxWrapper
                        language={
                            contentType.includes("application/json")
                                ? "json"
                                : "html"
                        }
                    >
                        {formatResponse(response)}
                    </SyntaxWrapper>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default HistoryResponseModal;
