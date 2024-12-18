import js from "@eslint/js"; // Importe les règles de base pour JavaScript.
import globals from "globals"; // Définit les variables globales du navigateur.
import react from "eslint-plugin-react"; // Plugin pour linting React.
import reactHooks from "eslint-plugin-react-hooks"; // Linting des hooks React.
import reactRefresh from "eslint-plugin-react-refresh"; // Plugin pour React Refresh (Hot Reload).

export default [
  { ignores: ["dist"] }, // Ignore le dossier de build `dist`.
  {
    files: ["**/*.{js,jsx}"], // Fichiers concernés.
    languageOptions: {
      ecmaVersion: 2020, // Version ECMAScript utilisée.
      globals: globals.browser, // Ajout des globales du navigateur.
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true }, // Active le support JSX.
        sourceType: "module", // Utilise les modules ES.
      },
    },
    settings: { react: { version: "18.3" } }, // Configuration React (par défaut, auto).
    plugins: {
      react, // Ajout du plugin React.
      "react-hooks": reactHooks, // Ajout du plugin React Hooks.
      "react-refresh": reactRefresh, // Ajout du plugin React Refresh.
    },
    rules: {
      ...js.configs.recommended.rules, // Règles JavaScript recommandées.
      ...react.configs.recommended.rules, // Règles React recommandées.
      ...react.configs["jsx-runtime"].rules, // Règles pour le runtime JSX.
      ...reactHooks.configs.recommended.rules, // Règles React Hooks recommandées.
      "react/jsx-no-target-blank": "off", // Désactive la règle sur les liens _blank.
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // Avertit sur les exports incompatibles avec React Refresh.
      ],
    },
  },
];
