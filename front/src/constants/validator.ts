import { z } from "zod";

export const newUrlSchema = z.object({
    name: z
        .string()
        .min(3, "Minimum 3 caractères")
        .max(55, "Maximum 55 caractères"),
    path: z.string().min(10, "Minimum 10 caractères").startsWith("https://", {
        message: "L'URL doit être sécurisée pour être ajoutée",
    }),
    checkFrequency: z.string().optional(),
});

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Minimum 3 caractères")
        .max(55, "Maximum 50 caractères"),
    email: z
        .string()
        .email("Entrez un email valide")
        .min(8, "Minimum 8 caractères")
        .max(255, "Maximum 255 caractères"),
    password: z
        .string()
        .min(8, "Minimum 8 caractères")
        .max(255, "Maximum 255 caractères")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Doit contenir minimum une majuscule, une minuscule, un chiffre et un caractère spécial",
        ),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email("Entrez un email valide")
        .min(8, "Minimum 8 caractères")
        .max(255, "Maximum 255 caractères"),
    password: z
        .string()
        .min(8, "Minimum 8 caractères")
        .max(255, "Maximum 255 caractères")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Doit contenir minimum une majuscule, une minuscule, un chiffre et un caractère spécial",
        ),
});

export const updateNameSchema = z.object({
    name: z
      .string()
      .min(3, "Minimum 3 caractères")
      .max(55, "Maximum 55 caractères")
});

export const updateFrequencySchema = z.object({
    checkFrequency: z.string().min(1, "La fréquence ne peut pas être vide."),
});

export const deleteUrlSchema = z.object({
    path: z.string().min(10, "Minimum 10 caractères").startsWith("https://", {
        message: "L'URL doit être sécurisée pour être ajoutée",
    }),
});