import { resolve } from 'utils/deps.ts';

export default async function c(y: number, d: number) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}/py`);

   const { code, stdout, stderr } = await new Deno.Command('python', {
      args: [resolve(path, 'main.py'), path],
   }).output();

   console.assert(code === 0);
   console.log(new TextDecoder().decode(stderr));
   console.log(new TextDecoder().decode(stdout).trim());
}
