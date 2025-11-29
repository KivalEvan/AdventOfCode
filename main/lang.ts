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

export const langName: Record<LangName, string> = {
   ts: "TypeScript 5.9",
   python: "Python 3.11",
   rust: "Rust 1.87",
   go: "Go 1.25",
   csharp: "C# 14",
   c: "C23",
   zig: "Zig 0.15",
   lua: "Lua 5.4",
   java: "Java 25",
   ocaml: "OCaml 5.4",
};

export function getLang(str?: string): LangName {
   return langParse[str?.toLowerCase() || ""] || str?.toLowerCase() || "";
}
