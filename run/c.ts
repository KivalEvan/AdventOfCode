import { resolve } from '../src/ts/deps.ts';

export default async function c(y: number, d: number, benchmark = false) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}`);

   console.log('Compiling...');
   const {
      code: c_code,
      stdout: c_stdout,
      stderr: c_stderr,
   } = await new Deno.Command('make', {
      args: ['AOC_PATH=' + path, 'c'],
   }).output();
   console.assert(c_code === 0);
   if (new TextDecoder().decode(c_stderr).trim()) {
      console.log(new TextDecoder().decode(c_stdout).trim());
      console.error(new TextDecoder().decode(c_stderr).trim());
      return;
   }

   console.log('Running...');
   const { code, stdout, stderr } = await new Deno.Command('./temp/aoc_c', {
      args: benchmark ? [path, 'b'] : [path],
   }).output();

   console.assert(code === 0);
   console.log(new TextDecoder().decode(stdout).trim());
   const td = new TextDecoder().decode(stderr).trim();
   if (td) console.log(td);
}
