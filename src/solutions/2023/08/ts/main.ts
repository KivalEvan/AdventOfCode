import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: true,
   hasIo: false,
};

function part1(input: string, _isTest: boolean): string {
   const sides = input.split('\n\n');
   const instructions = sides[0].replaceAll('L', '0').replaceAll('R', '1');
   const maps = sides[1]
      .split('\n')
      .map((str) => {
         const [dest, lr] = str.split(' = ');
         return [dest, lr.slice(1, lr.length - 1).split(', ')] as [string, [string, string]];
      })
      .reduce((pv, v) => {
         pv[v[0]] = v[1];
         return pv;
      }, {} as Record<string, [string, string]>);

   let i = 0;
   let nav = 'AAA';
   while (true) {
      const map = maps[nav];
      nav = map[instructions[i % instructions.length] as '0'];
      i++;
      if (nav === 'ZZZ') break;
   }
   return i.toString();
}

function gcd(a: number, b: number): number {
   return !b ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
   return (a * b) / gcd(a, b);
}

function part2(input: string, _isTest: boolean): string {
   const sides = input.split('\n\n');
   const instructions = sides[0].replaceAll('L', '0').replaceAll('R', '1');
   const maps = sides[1]
      .split('\n')
      .map((str) => {
         const [dest, lr] = str.split(' = ');
         return [dest, lr.slice(1, lr.length - 1).split(', ')] as [string, [string, string]];
      })
      .reduce((pv, v) => {
         pv[v[0]] = v[1];
         return pv;
      }, {} as Record<string, [string, string]>);

   const navs = Object.keys(maps).filter((s) => s[2] === 'A');
   const dists = new Array(navs.length).fill(0);
   for (let i = 0; i < navs.length; i++) {
      let j = 0;
      while (true) {
         const map = maps[navs[i]];
         navs[i] = map[instructions[j % instructions.length] as '0'];
         j++;
         if (navs[i][2] === 'Z') break;
      }
      dists[i] = j;
   }
   return dists.reduce((pv, v) => lcm(pv, v), 1).toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
