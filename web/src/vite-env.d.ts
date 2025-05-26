/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // adicione outras variáveis aqui, sempre começando com VITE_
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
