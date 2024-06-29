export type LangName = 'c' | 'csharp' | 'go' | 'java' | 'python' | 'rust' | 'ts';

export const langParse: Record<string, LangName> = {
   typescript: 'ts',
   py: 'python',
   rs: 'rust',
   cs: 'csharp',
   'c#': 'csharp',
};

export const langCompile: LangName[] = [
   'c',
   'csharp',
   'go',
   'java',
   'rust',
];

export const langName: Record<LangName, string> = {
   c: 'C23',
   csharp: 'C# 12',
   go: 'Go 1.22.4',
   java: 'Java 22',
   python: 'Python 3.12',
   rust: 'Rust 1.74',
   ts: 'TypeScript 5.4',
};

export function getLang(str?: string): LangName {
   return langParse[str?.toLowerCase() || ''] || str?.toLowerCase() || '';
}
