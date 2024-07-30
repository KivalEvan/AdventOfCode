import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { langCompile, LangName } from './lang.ts';

const execAsync = promisify(exec);

export async function runner(
   lang: LangName,
   year: number,
   day: number,
   benchmark: number,
) {
   const needCompile = langCompile.includes(lang);

   if (needCompile) {
      console.log('Compiling...');
      const cmd = await execAsync(
         'make ' +
            [
               lang + '_compile',
               'YEAR=' + year,
               'DAY=' + day.toString().padStart(2, '0'),
            ].join(' '),
      );

      const stderr = cmd.stderr.trim();
      if (stderr && stderr.length !== 115) {
         console.log(cmd.stdout.trim());
         console.error(stderr);
         return;
      }
   }

   if (benchmark > 0) console.log('Benchmarking...');
   else console.log('Running...');
   const { stdout, stderr } = await execAsync(
      'make ' +
         [
            lang,
            'YEAR=' + year,
            'DAY=' + day.toString().padStart(2, '0'),
            'BENCH=' + benchmark.toString(),
         ].join(' '),
   );

   console.log(stdout.trim());
   const td = stderr.trim();
   if (td) console.log(td);
}
