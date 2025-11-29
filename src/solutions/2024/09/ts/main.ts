import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

type Disk = {
   size: number;
   free: number;
   moved: number;
   space: number[];
};

function solve(input: string, p2: boolean): string {
   const disks: Disk[] = [];
   for (let i = 0; i < input.length; i += 2) {
      if (i + 1 === input.length) {
         disks.push({ size: +input[i], free: 0, space: [], moved: 0 });
      }
      else {
         disks.push({
            size: +input[i],
            free: +input[i + 1],
            space: [],
            moved: 0,
         });
      }
   }

   let left = 0;
   let right = disks.length - 1;
   let firstPos = 0;
   if (p2) {
      while (left < right) {
         if (disks[left].free >= disks[right].size) {
            for (let i = 0; i < disks[right].size; i++) {
               disks[left].space.push(right);
            }
            disks[left].free -= disks[right].size;
            disks[right].moved += disks[right].size;
            disks[right].size = 0;
            left = firstPos;
            right--;
         }
         else {
            left++;
         }

         if (disks[firstPos].free === 0) {
            firstPos = left;
         }

         if (left === right) {
            left = firstPos;
            right--;
         }
      }
   }
   else {
      while (left < right) {
         if (disks[left].free > 0 && disks[right].size > 0) {
            disks[left].space.push(right);
            disks[left].free--;
            disks[right].size--;
         }

         if (disks[right].size === 0) {
            right--;
         }
         if (disks[left].free === 0) {
            left++;
         }
      }
   }

   let total = 0;
   let i = 0;
   for (const k in disks) {
      i += disks[k].moved;
      for (let s = 0; s < disks[k].size; s++) {
         total += i * +k;
         i++;
      }
      for (const n of disks[k].space) {
         total += i * +n;
         i++;
      }
      i += disks[k].free;
   }

   return total.toString();
}

function part1(input: string, _isTest: boolean): string {
   return solve(input, false);
}

function part2(input: string, _isTest: boolean): string {
   return solve(input, true);
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
