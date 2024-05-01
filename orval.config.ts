import { defineConfig } from "orval";
import { loadEnv } from "vite";

export default (mode: string) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return defineConfig({
    career: {
      input: {
        target: process.env.VITE_API_URL ?? "",
      },
      output: {
        mode: "tags-split",
        target: "src/api/generated/reactQuery/query.ts",
        schemas: "src/api/generated/model",
        client: "react-query",
        override: {
          formUrlEncoded: false,
          mutator: {
            path: "./src/api/orvalAxios.ts",
            name: "customInstance",
          },
          query: {
            useQuery: true,
          },
        },
      },
      hooks: {
        afterAllFilesWrite: "prettier --write",
      },
    },
  });
};
