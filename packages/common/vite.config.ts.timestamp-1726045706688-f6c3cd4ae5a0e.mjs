// vite.config.ts
import { defineConfig } from "file:///C:/Users/31987/codes/github/turborepo/turborepo-package/node_modules/.pnpm/vite@5.4.2_@types+node@22.5.0_sass@1.77.8/node_modules/vite/dist/node/index.js";
import { resolve } from "path";

// package.json
var dependencies = {
  "@repo/shared": "workspace:*",
  "@repo/storage": "workspace:*",
  "@repo/ui": "workspace:*"
};
var peerDependencies = {
  react: "^18.2.0"
};

// vite.config.ts
import react from "file:///C:/Users/31987/codes/github/turborepo/turborepo-package/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.4.2/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///C:/Users/31987/codes/github/turborepo/turborepo-package/node_modules/.pnpm/vite-plugin-dts@4.0.3_@types+node@22.5.0_typescript@5.5.4_vite@5.4.2/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\31987\\codes\\github\\turborepo\\turborepo-package\\packages\\common";
var vite_config_default = defineConfig({
  plugins: [
    react({
      "jsxRuntime": "classic"
    }),
    dts({
      include: ["src/**/*"]
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src", "index.ts"),
      formats: ["es", "cjs"],
      name: "theme",
      fileName: (format, entryName) => {
        return `${entryName}.${format}.js`;
      }
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
      output: {
        preserveModules: true,
        preserveModulesRoot: resolve(__vite_injected_original_dirname, "src"),
        exports: "auto"
      }
    },
    target: "esnext",
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMzE5ODdcXFxcY29kZXNcXFxcZ2l0aHViXFxcXHR1cmJvcmVwb1xcXFx0dXJib3JlcG8tcGFja2FnZVxcXFxwYWNrYWdlc1xcXFxjb21tb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDMxOTg3XFxcXGNvZGVzXFxcXGdpdGh1YlxcXFx0dXJib3JlcG9cXFxcdHVyYm9yZXBvLXBhY2thZ2VcXFxccGFja2FnZXNcXFxcY29tbW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8zMTk4Ny9jb2Rlcy9naXRodWIvdHVyYm9yZXBvL3R1cmJvcmVwby1wYWNrYWdlL3BhY2thZ2VzL2NvbW1vbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBwZWVyRGVwZW5kZW5jaWVzLCBkZXBlbmRlbmNpZXMgfSBmcm9tICcuL3BhY2thZ2UuanNvbidcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtcclxuXHRcdHJlYWN0KHtcclxuXHRcdFx0J2pzeFJ1bnRpbWUnOiAnY2xhc3NpYydcclxuXHRcdH0pLFxyXG5cdFx0ZHRzKHtcclxuXHRcdFx0aW5jbHVkZTogWydzcmMvKiovKiddLFxyXG5cdFx0fSlcclxuXHRdLFxyXG5cdGJ1aWxkOiB7XHJcblx0XHRsaWI6IHtcclxuXHRcdFx0ZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJywgJ2luZGV4LnRzJyksXHJcblx0XHRcdGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXHJcblx0XHRcdG5hbWU6IFwidGhlbWVcIixcclxuXHRcdFx0ZmlsZU5hbWU6IChmb3JtYXQsIGVudHJ5TmFtZSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiBgJHtlbnRyeU5hbWV9LiR7Zm9ybWF0fS5qc2BcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRyb2xsdXBPcHRpb25zOiB7XHJcblx0XHRcdGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMocGVlckRlcGVuZGVuY2llcyksIC4uLk9iamVjdC5rZXlzKGRlcGVuZGVuY2llcyldLFxyXG5cdFx0XHRvdXRwdXQ6IHtcclxuXHRcdFx0XHRwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXHJcblx0XHRcdFx0cHJlc2VydmVNb2R1bGVzUm9vdDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuXHRcdFx0XHRleHBvcnRzOiAnYXV0bydcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRhcmdldDogJ2VzbmV4dCcsXHJcblx0XHRzb3VyY2VtYXA6IHRydWVcclxuXHR9LFxyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdCdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuXHRcdH1cclxuXHR9XHJcbn0pIiwgIntcclxuXHRcIm5hbWVcIjogXCJAcmVwby9jb21tb25cIixcclxuXHRcInZlcnNpb25cIjogXCIxLjAuMFwiLFxyXG5cdFwiZGVzY3JpcHRpb25cIjogXCJ0aGVtZSByZXBvXCIsXHJcblx0XCJzY3JpcHRzXCI6IHtcclxuXHRcdFwiZGV2XCI6IFwidml0ZSBidWlsZCAmJiBucG0gcnVuIGJ1aWxkOnN0eWxlc1wiLFxyXG5cdFx0XCJyZWFkeVwiOiBcInZpdGUgYnVpbGQgJiYgbnBtIHJ1biBidWlsZDpzdHlsZXNcIixcclxuXHRcdFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkICYmIG5wbSBydW4gYnVpbGQ6c3R5bGVzXCIsXHJcblx0XHRcImJ1aWxkOnN0eWxlc1wiOiBcInBvc3Rjc3MgLi9zcmMvZ2xvYmFscy5jc3MgLW8gLi9kaXN0L2dsb2JhbHMuY3NzXCIsXHJcblx0XHRcImxpbnRcIjogXCJlc2xpbnQgc3JjIC0tZXh0IHRzLHRzeCAtLXJlcG9ydC11bnVzZWQtZGlzYWJsZS1kaXJlY3RpdmVzIC0tbWF4LXdhcm5pbmdzIDBcIlxyXG5cdH0sXHJcblx0XCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcblx0XCJtYWluXCI6IFwiZGlzdC9pbmRleC5janMuanNcIixcclxuXHRcIm1vZHVsZVwiOiBcImRpc3QvaW5kZXguZXMuanNcIixcclxuXHRcInR5cGVzXCI6IFwiZGlzdC9zcmMvaW5kZXguZC50c1wiLFxyXG5cdFwic2lkZUVmZmVjdHNcIjogZmFsc2UsXHJcblx0XCJmaWxlc1wiOiBbXHJcblx0XHRcImRpc3RcIlxyXG5cdF0sXHJcblx0XCJhdXRob3JcIjogXCJcIixcclxuXHRcImxpY2Vuc2VcIjogXCJJU0NcIixcclxuXHRcImRlcGVuZGVuY2llc1wiOiB7XHJcblx0XHRcIkByZXBvL3NoYXJlZFwiOiBcIndvcmtzcGFjZToqXCIsXHJcblx0XHRcIkByZXBvL3N0b3JhZ2VcIjogXCJ3b3Jrc3BhY2U6KlwiLFxyXG5cdFx0XCJAcmVwby91aVwiOiBcIndvcmtzcGFjZToqXCJcclxuXHR9LFxyXG5cdFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuXHRcdFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMjBcIixcclxuXHRcdFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxyXG5cdFx0XCJsdWNpZGUtcmVhY3RcIjogXCJeMC40MjcuMFwiLFxyXG5cdFx0XCJwb3N0Y3NzXCI6IFwiXjguNC40MVwiLFxyXG5cdFx0XCJwb3N0Y3NzLWNsaVwiOiBcIl4xMS4wLjBcIixcclxuXHRcdFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjEwXCIsXHJcblx0XHRcInR5cGVzY3JpcHRcIjogXCJeNS4zLjNcIixcclxuXHRcdFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiXjQuMC4zXCJcclxuXHR9LFxyXG5cdFwicGVlckRlcGVuZGVuY2llc1wiOiB7XHJcblx0XHRcInJlYWN0XCI6IFwiXjE4LjIuMFwiXHJcblx0fVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5WixTQUFTLG9CQUFvQjtBQUN0YixTQUFTLGVBQWU7OztBQ29CdkIsbUJBQWdCO0FBQUEsRUFDZixnQkFBZ0I7QUFBQSxFQUNoQixpQkFBaUI7QUFBQSxFQUNqQixZQUFZO0FBQ2I7QUFXQSx1QkFBb0I7QUFBQSxFQUNuQixPQUFTO0FBQ1Y7OztBRG5DRCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBSmhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLE1BQU07QUFBQSxNQUNMLGNBQWM7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxNQUNILFNBQVMsQ0FBQyxVQUFVO0FBQUEsSUFDckIsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNKLE9BQU8sUUFBUSxrQ0FBVyxPQUFPLFVBQVU7QUFBQSxNQUMzQyxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFFBQVEsY0FBYztBQUNoQyxlQUFPLEdBQUcsU0FBUyxJQUFJLE1BQU07QUFBQSxNQUM5QjtBQUFBLElBQ0Q7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNkLFVBQVUsQ0FBQyxHQUFHLE9BQU8sS0FBSyxnQkFBZ0IsR0FBRyxHQUFHLE9BQU8sS0FBSyxZQUFZLENBQUM7QUFBQSxNQUN6RSxRQUFRO0FBQUEsUUFDUCxpQkFBaUI7QUFBQSxRQUNqQixxQkFBcUIsUUFBUSxrQ0FBVyxLQUFLO0FBQUEsUUFDN0MsU0FBUztBQUFBLE1BQ1Y7QUFBQSxJQUNEO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDWjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUM5QjtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
