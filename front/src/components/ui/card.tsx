import * as React from "react";

import { cn } from "@/lib/utils";

const getStatusColor = (statusCode: number | null) => {
    if (statusCode === null) {
        return "bg-gray-500";
    }
    if (statusCode >= 200 && statusCode < 300) {
        return "bg-green-500";
    }
    if (statusCode >= 300 && statusCode < 400) {
        return "bg-yellow-500";
    }
    if (statusCode >= 400 && statusCode < 500) {
        return "bg-red-500";
    }
    if (statusCode >= 500 && statusCode < 600) {
        return "bg-red-500";
    }
    return "bg-gray-500";
};

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
            "text-2xl font-semibold leading-none tracking-tight text-right",
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
        className={`text-sm text-muted-foreground text-right whitespace-pre-wrap ${className}`}
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
                className={`w-4 h-4 rounded-full ${statusColor} mr-2`}
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
    CardTitle,
    CardDescription,
    CardContent,
    List,
    ListItem,
    CardStatus,
};
