import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

type Rule = ['x' | 'm' | 'a' | 's', '>' | '<', number, string];

function parseInput(
   input: string,
): [Record<string, (string | Rule)[]>, Record<string, number>[]] {
   const parsed = input.split('\n\n');

   const workflows = parsed[0]
      .split('\n')
      .map((e) => {
         const t = e.split('{');

         return {
            name: t[0],
            conditions: t[1]
               .replace('}', '')
               .split(',')
               .map((m, i, ary) => {
                  if (ary.length - 1 === i) {
                     return m;
                  }
                  const xdd = m.split(':');
                  let idxOf = m.indexOf('<');
                  if (idxOf === -1) idxOf = m.indexOf('>');
                  return [
                     m.slice(0, idxOf),
                     m[idxOf],
                     Number(xdd[0].slice(idxOf + 1)),
                     xdd[1],
                  ];
               }),
         };
      })
      .reduce((obj, v) => {
         obj[v.name] = v.conditions as (string | Rule)[];
         return obj;
      }, {} as Record<string, (string | Rule)[]>);
   const parts = JSON.parse(
      '[' +
         parsed[1]
            .replaceAll('=', '":')
            .replaceAll(',', ',"')
            .replaceAll('{', '{"')
            .replaceAll('\n', ',') +
         ']',
   );

   return [workflows, parts];
}

function part1(input: string, _isTest: boolean): string {
   const [workflows, parts] = parseInput(input);

   let res = 0;
   for (const p of parts) {
      let wf = workflows['in'];
      while (true) {
         const conditions = wf.slice(0, wf.length - 1) as Rule[];
         let proceedTo = wf[wf.length - 1] as string;

         for (const c of conditions) {
            if (c[1] === '<') {
               if (p[c[0]] < c[2]) {
                  proceedTo = c[3];
                  break;
               }
            }
            if (c[1] === '>') {
               if (p[c[0]] > c[2]) {
                  proceedTo = c[3];
                  break;
               }
            }
         }

         if (proceedTo === 'A') {
            res += Object.values(p).reduce((pv, v) => pv + v, 0);
            break;
         }
         if (proceedTo === 'R') {
            break;
         }

         wf = workflows[proceedTo];
      }
   }

   return res.toString();
}

function rangeLessThan(range: [number, number], num: number): [number, number] {
   const r: [number, number] = [...range];
   if (r[0] < num) r[0] = num + 1;
   return r;
}

function rangeMoreThan(range: [number, number], num: number): [number, number] {
   const r: [number, number] = [...range];
   if (r[1] > num) r[1] = num - 1;
   return r;
}

function rangeEqualLessThan(
   range: [number, number],
   num: number,
): [number, number] {
   const r: [number, number] = [...range];
   if (r[0] <= num) r[0] = num;
   return r;
}

function rangeEqualMoreThan(
   range: [number, number],
   num: number,
): [number, number] {
   const r: [number, number] = [...range];
   if (r[1] >= num) r[1] = num;
   return r;
}

function combinationsithink(
   workflows: Record<string, (string | Rule)[]>,
   wfname: string,
   parts: {
      x: [number, number];
      m: [number, number];
      a: [number, number];
      s: [number, number];
   },
): number {
   if (wfname === 'A') {
      return (
         (parts.x[1] - parts.x[0] + 1) *
         (parts.m[1] - parts.m[0] + 1) *
         (parts.a[1] - parts.a[0] + 1) *
         (parts.s[1] - parts.s[0] + 1)
      );
   }
   if (wfname === 'R') return 0;

   const wf = workflows[wfname];
   const conditions = wf.slice(0, wf.length - 1) as Rule[];
   const fallback = wf[wf.length - 1] as string;

   let count = 0;

   for (const c of conditions) {
      if (c[1] === '<') {
         count += combinationsithink(workflows, c[3], {
            ...parts,
            [c[0]]: rangeMoreThan(parts[c[0]], c[2]),
         });
         parts[c[0]] = rangeEqualLessThan(parts[c[0]], c[2]);
      }
      if (c[1] === '>') {
         count += combinationsithink(workflows, c[3], {
            ...parts,
            [c[0]]: rangeLessThan(parts[c[0]], c[2]),
         });
         parts[c[0]] = rangeEqualMoreThan(parts[c[0]], c[2]);
      }
   }

   return count + combinationsithink(workflows, fallback, parts);
}

function part2(input: string, _isTest: boolean): string {
   const [workflows, _] = parseInput(input);
   return combinationsithink(workflows, 'in', {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
   }).toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
