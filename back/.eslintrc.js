// .eslintrc.js example
module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // Utiliser les recommandations pour TypeScript
    ],
    parser: "@typescript-eslint/parser", // Utiliser le parser TypeScript
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", // Spécifier le chemin vers votre fichier tsconfig.json
    },
    plugins: [
        "@typescript-eslint", // Utiliser le plugin TypeScript ESLint
    ],
    rules: {
        // Vous pouvez ajouter ou modifier des règles spécifiques ici
    },
    overrides: [
        {
            files: ["*.ts"],
        },
    ],
};
