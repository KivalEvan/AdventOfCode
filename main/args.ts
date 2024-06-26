import { parseArgs } from './deps.ts';

export function fetchArgs() {
   return parseArgs(Deno.args, {
      string: ['d', 'y', 'l', 'b'],
      boolean: ['a', 't', 'm'],
      alias: { d: 'day', a: 'all', y: 'year', m: 'm', l: 'lang', b: 'bench' },
   });
}
