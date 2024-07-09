import { z } from "zod";

export const newUrlSchema = z.object({
    name: z
        .string()
        .min(3, "Minimum 3 caractères")
        .max(55, "Maximum 55 caractères"),
    path: z.string().min(10, "Minimum 10 caractères"),
});
