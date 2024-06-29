import { langCompile, LangName } from './lang.ts';

export async function runner(
   lang: LangName,
   year: number,
   day: number,
   benchmark: number,
) {
   const needCompile = langCompile.includes(lang);

   if (needCompile) {
      console.log('Compiling...');
      const {
         code: c_code,
         stdout: c_stdout,
         stderr: c_stderr,
      } = await new Deno.Command('make', {
         args: [
            lang + '_compile',
            'YEAR=' + year,
            'DAY=' + day.toString().padStart(2, '0'),
         ],
      }).output();
      if (c_code !== 0) {
         console.log(new TextDecoder().decode(c_stdout).trim());
         console.error(new TextDecoder().decode(c_stderr).trim());
         return;
      }
   }

   if (benchmark > 0) console.log('Benchmarking...');
   else console.log('Running...');
   const { code, stdout, stderr } = await new Deno.Command('make', {
      args: [
         lang,
         'YEAR=' + year,
         'DAY=' + day.toString().padStart(2, '0'),
         'BENCH=' + benchmark.toString(),
      ],
   }).output();

   console.assert(code === 0);
   console.log(new TextDecoder().decode(stdout).trim());
   const td = new TextDecoder().decode(stderr).trim();
   if (td) console.log(td);
}
