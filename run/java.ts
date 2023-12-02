import { resolve } from 'utils/deps.ts';

export default async function c(y: number, d: number) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}/java`);

   console.log('Compiling...');
   const {
      code: c_code,
      stdout: c_stdout,
      stderr: c_stderr,
   } = await new Deno.Command('make', {
      args: ['execute', path],
   }).output();
   console.assert(c_code === 0);
   if (new TextDecoder().decode(c_stderr).trim()) {
      console.error(new TextDecoder().decode(c_stderr).trim());
      console.log(new TextDecoder().decode(c_stdout).trim());
      return;
   }

   console.log('Running...');
   const { code, stdout, stderr } = await new Deno.Command('./temp/aoc_java', {
      args: [path],
   }).output();

   console.assert(code === 0);
   console.log(new TextDecoder().decode(stderr));
   console.log(new TextDecoder().decode(stdout).trim());
}
