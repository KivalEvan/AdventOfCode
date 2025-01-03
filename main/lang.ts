export type LangName =
   | 'c'
   | 'csharp'
   | 'go'
   | 'java'
   | 'python'
   | 'rust'
   | 'ts'
   | 'ocaml'
   | 'lua'
   | 'zig';

export const langParse: Record<string, LangName> = {
   typescript: 'ts',
   py: 'python',
   rs: 'rust',
   cs: 'csharp',
   'c#': 'csharp',
   ml: 'ocaml',
};

export const langCompile: LangName[] = [
   'c',
   'csharp',
   'go',
   'java',
   'rust',
   'zig',
];

export const langName: Record<LangName, string> = {
   ts: 'TypeScript 5.6',
   python: 'Python 3.10',
   rust: 'Rust 1.82',
   go: 'Go 1.23',
   csharp: 'C# 12',
   c: 'C23',
   zig: 'Zig 0.13',
   lua: 'Lua 5.4',
   java: 'Java 23',
   ocaml: 'OCaml 5.2',
};

export function getLang(str?: string): LangName {
   return langParse[str?.toLowerCase() || ''] || str?.toLowerCase() || '';
}
