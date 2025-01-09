import { Roles } from '@/constants/role.ts';

export interface Feature {
    text: string;
    included: boolean;
    highlight?: {
        value: string;
        position: number;
    };
}

interface Subscription {
    id: Roles;
    title: string;
    description: string;
    price: number;
    features: Feature[];
}

export const subscriptions: Subscription[] = [
    {
        id: Roles.FREE,
        title: "Basique",
        description: "Accédez aux fonctionnalitées de base.",
        price: 0,
        features: [
            {
                text: "Ajoutez jusqu'à URLs Privées",
                included: true,
                highlight: {
                    value: "5",
                    position: 1
                }
            },
            {
                text: "Changer l'interval de vérification des URLs",
                included: false
            },
            {
                text: "Lancer l'analyse instantanée des URLs",
                included: false
            }
        ]
    },
    {
        id: Roles.TIER,
        title: "Tier",
        description: "Le basique, mais en 10x mieux.",
        price: 3,
        features: [
            {
                text: "Ajoutez jusqu'à URLs Privées",
                included: true,
                highlight: {
                    value: "50",
                    position: 1
                }
            },
            {
                text: "Changer l'interval de vérification des URLs",
                included: false
            },
            {
                text: "Lancer l'analyse instantanée des URLs",
                included: false
            }
        ]
    },
    {
        id: Roles.PREMIUM,
        title: "Premium",
        description: "Utilisez nos services en illimité.",
        price: 10,
        features: [
            {
                text: "Nombre d'URL Privées",
                included: true,
                highlight: {
                    value: "Illimité",
                    position: 2
                }
            },
            {
                text: "Changer l'interval de vérification des URLs",
                included: true
            },
            {
                text: "Lancer l'analyse instantanée des URLs",
                included: true
            }
        ]
    }
];