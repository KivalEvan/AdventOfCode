export const langParse: Record<string, string> = {
   typescript: 'ts',
   py: 'python',
   rs: 'rust',
   'cs': 'csharp',
   'c#': 'csharp',
};

export const langName: Record<string, string> = {
   c: 'C23',
   csharp: 'C# 12',
   go: 'Go 1.22.4',
   java: 'Java 22',
   python: 'Python 3.12',
   rust: 'Rust 1.74',
   ts: 'TypeScript 5.4',
};

export function getLang(str?: string): string {
   return langParse[str?.toLowerCase() || ''] || str?.toLowerCase() || '';
}
