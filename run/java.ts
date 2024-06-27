import { resolve } from '../src/ts/deps.ts';

export default async function c(y: number, d: number, benchmark: number) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}`);

   console.log('Compiling...');
   const {
      code: c_code,
      stdout: c_stdout,
      stderr: c_stderr,
   } = await new Deno.Command('make', {
      args: [
         'AOC_PATH=' + path,
         'java',
         'YEAR=' + y,
         'DAY=' + d.toString().padStart(2, '0'),
      ],
   }).output();
   console.assert(c_code === 0);
   if (new TextDecoder().decode(c_stderr).trim().length !== 109) {
      console.error(new TextDecoder().decode(c_stderr).trim());
      console.log(new TextDecoder().decode(c_stdout).trim());
      return;
   }

   console.log('Running...');
   const { code, stdout, stderr } = await new Deno.Command('java', {
      args: [
         '--enable-preview',
         '-cp',
         'temp',
         `kival/aoc/year${y}/day${d.toString().padStart(2, '0')}/Main`,
         path,
         benchmark.toString(),
      ],
   }).output();

   console.assert(code === 0);
   console.log(new TextDecoder().decode(stderr));
   console.log(new TextDecoder().decode(stdout).trim());
}
