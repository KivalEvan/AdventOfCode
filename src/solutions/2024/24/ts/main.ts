import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, p2: boolean): string {
   const lines = input.split("\n\n");
   const gates: Record<string, number> = {};
   let min = Infinity;
   let max = -Infinity;
   for (const line of lines[0].split("\n")) {
      const [name, expr] = line.split(": ");
      gates[name] = +expr;
      min = Math.min(min, Number(name.substring(1)));
      max = Math.max(max, Number(name.substring(1)) + 1);
   }
   const operations = lines[1]
      .split("\n")
      .map((line) => line.split(" ").filter((e) => e !== "->"));
   const keepOps = [...operations];
   const p2Answer = [];

   while (operations.length) {
      const ops = operations.shift()!;
      if (ops[0] in gates && ops[2] in gates) {
         switch (ops[1]) {
            case "XOR":
               gates[ops[3]] = gates[ops[0]] ^ gates[ops[2]];
               break;
            case "OR":
               gates[ops[3]] = gates[ops[0]] | gates[ops[2]];
               break;
            case "AND":
               gates[ops[3]] = gates[ops[0]] & gates[ops[2]];
               break;
            default:
         }
         if (
            (ops[3][0] === "z"
               && ops[1] !== "XOR"
               && Number(ops[3].substring(1)) < max)
            || (ops[3][0] !== "z"
               && !"xy".match(ops[0][0])
               && !"xy".match(ops[2][0])
               && ops[1] === "XOR")
            || ("xy".match(ops[0][0])
               && Number(ops[0].substring(1)) > min
               && "xy".match(ops[2][0])
               && Number(ops[2].substring(1)) > min
               && ops[1] === "XOR"
               && !keepOps.some(
                  (next) =>
                     next[1] === "XOR"
                     && (next[0] === ops[3] || next[2] === ops[3]),
               ))
            || ("xy".match(ops[0][0])
               && Number(ops[0].substring(1)) > min
               && "xy".match(ops[2][0])
               && Number(ops[2].substring(1)) > min
               && ops[1] === "AND"
               && !keepOps.some(
                  (next) =>
                     next[1] === "OR"
                     && (next[0] === ops[3] || next[2] === ops[3]),
               ))
         ) {
            p2Answer.push(ops[3]);
         }
      }
      else {
         operations.push(ops);
      }
   }
   if (p2) return p2Answer.sort().join(",");
   return parseInt(
      Object.keys(gates)
         .sort()
         .filter((g) => g.startsWith("z"))
         .reverse()
         .map((g) => gates[g].toString())
         .reduce((pv, v) => pv + v, ""),
      2,
   ).toString();
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
