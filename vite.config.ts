import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  /**
   * Divisão do bundle do cliente.
   *
   * Não dá para dividir por ROTA aqui: o site é pré-renderizado com
   * `renderToString` (ver src/entry-server.tsx), e `React.lazy` sob
   * `renderToString` grava o fallback do Suspense no HTML estático, no lugar
   * do conteúdo. Seria trocar SEO por bytes.
   *
   * O que dá é separar o que não muda do que muda. As bibliotecas ficam num
   * arquivo próprio, com hash próprio: quando o código do site muda, e é o que
   * muda toda semana, o navegador de quem já visitou reaproveita a parte
   * pesada em vez de baixar tudo de novo.
   *
   * Só no build do cliente: no build de SSR o Rollup ignora manualChunks.
   */
  build: isSsrBuild
    ? undefined
    : {
        rollupOptions: {
          output: {
            manualChunks: {
              "vendor-react": ["react", "react-dom", "react-router-dom"],
              "vendor-ui": ["@radix-ui/react-tooltip", "@radix-ui/react-toast", "sonner", "lucide-react"],
              "vendor-scroll": ["lenis", "gifuct-js"],
            },
          },
        },
      },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  ssr: {
    // Bundle CJS-only deps so Node ESM interop works in the SSR/SSG build.
    noExternal: ["react-helmet-async"],
  },
}));
