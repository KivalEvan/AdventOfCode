export type LangName =
   | 'c'
   | 'csharp'
   | 'go'
   | 'java'
   | 'python'
   | 'rust'
   | 'ts'
   | 'kotlin'
   | 'elixir'
   | 'lua';

export const langParse: Record<string, LangName> = {
   typescript: 'ts',
   py: 'python',
   rs: 'rust',
   kt: 'kotlin',
   cs: 'csharp',
   'c#': 'csharp',
};

export const langCompile: LangName[] = [
   'c',
   'csharp',
   'go',
   'java',
   'rust',
   'kotlin',
   'elixir',
];

export const langName: Record<LangName, string> = {
   ts: 'TypeScript 5.4',
   go: 'Go 1.22',
   python: 'Python 3.10',
   c: 'C23',
   csharp: 'C# 12',
   kotlin: 'Kotlin 2.0',
   java: 'Java 22',
   lua: 'Lua 5.4',
   rust: 'Rust 1.74',
   elixir: 'Elixir 1.17',
};

export function getLang(str?: string): LangName {
   return langParse[str?.toLowerCase() || ''] || str?.toLowerCase() || '';
}
