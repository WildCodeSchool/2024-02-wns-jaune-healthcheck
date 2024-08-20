module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: [
        "dist",
        ".eslintrc.cjs",
        "tailwind.config.js",
        "src/generated",
        "src/__tests__",
    ],
    parser: "@typescript-eslint/parser",
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
        },
    ],
};
