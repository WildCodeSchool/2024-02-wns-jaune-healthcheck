import * as React from "react";

import { cn } from "@/lib/utils";
import { getStatusColor } from "@/constants/globalFunction";

const insertLineBreaks = (url: string, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    const regex = new RegExp(`.{1,${maxLength}}`, "g");
    const matches = url.match(regex);
    if (matches === null) return url;
    return matches.join("\n");
};

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            className,
        )}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className,
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & { url?: string }
>(({ className, url, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    >
        {url ? insertLineBreaks(url) : props.children}
    </p>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

CardContent.displayName = "CardContent";

const CardStatus = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { statusCode: number | null }
>(({ className, statusCode, ...props }, ref) => {
    const statusColor = getStatusColor(statusCode);

    return (
        <div
            ref={ref}
            className={cn(
                "text-sm font-semibold text-right flex items-center",
                className,
            )}
            {...props}
        >
            <span
                data-testid="status-indicator"
                className={`w-5 h-5 rounded-full ${statusColor} mr-2`}
            ></span>
        </div>
    );
});
CardStatus.displayName = "CardStatus";

const List = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("space-y-2", className)} {...props} />
));
List.displayName = "List";

const ListItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("last:border-b-0", className)} {...props} />
));
ListItem.displayName = "ListItem";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    List,
    ListItem,
    CardStatus,
};
