import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "react",
      jsc: {
        transform: {
          react: {
            throwIfNamespace: false, // Allow JSX namespaces
          },
        },
      },
    }),
    tailwindcss(),
  ],
});
