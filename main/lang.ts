export type LangName =
   | "c"
   | "csharp"
   | "go"
   | "java"
   | "python"
   | "rust"
   | "ts"
   | "ocaml"
   | "lua"
   | "zig";

export const langParse: Record<string, LangName> = {
   typescript: "ts",
   py: "python",
   rs: "rust",
   cs: "csharp",
   "c#": "csharp",
   ml: "ocaml",
};

export const langCompile: LangName[] = [
   "c",
   "csharp",
   "go",
   "java",
   "rust",
   "zig",
];

export const langExt: Record<LangName, string> = {
   ts: "ts",
   python: "py",
   csharp: "cs",
   c: "c",
   lua: "lua",
   go: "go",
   rust: "rs",
   java: "java",
   zig: "zig",
   ocaml: "ml",
};

export const langName: Record<LangName, string> = {
   ts: "TypeScript 5.9",
   python: "Python 3.11",
   csharp: "C# 14",
   c: "C23",
   lua: "Lua 5.4",
   go: "Go 1.25",
   rust: "Rust 1.87",
   java: "Java 25",
   zig: "Zig 0.15",
   ocaml: "OCaml 5.4",
};

export function getLang(str?: string): LangName {
   return langParse[str?.toLowerCase() || ""] || str?.toLowerCase() || "";
}
