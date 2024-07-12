export const formatLocalDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export const getStatusColor = (statusCode: number | null) => {
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
