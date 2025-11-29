import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function findCliques(
   graph: Record<string, Set<string>>,
   minSize = 1,
   maxSize = Infinity,
) {
   const nodes = Object.keys(graph);
   const cliques: string[][] = [];

   function bronKerbosch(R: string[], P: string[], X: string[]) {
      if (P.length === 0 && X.length === 0) {
         if (R.length >= minSize && R.length <= maxSize) {
            cliques.push([...R]);
         }
         return;
      }

      const pivot = P.concat(X)[0];
      const pivotNeighbors = graph[pivot];

      for (const node of P.filter((n) => !pivotNeighbors.has(n))) {
         bronKerbosch(
            [...R, node],
            P.filter((n) => graph[node].has(n)),
            X.filter((n) => graph[node].has(n)),
         );
         P = P.filter((n) => n !== node);
         X.push(node);
      }
   }

   bronKerbosch([], nodes, []);
   return cliques;
}

function solve(input: string, p2: boolean): string {
   const connections: Record<string, Set<string>> = {};
   input.split("\n").forEach((s) => {
      const comp = s.split("-") as [string, string];
      const [c1, c2] = comp;
      connections[c1] ||= new Set();
      connections[c2] ||= new Set();
      connections[c1].add(c2);
      connections[c2].add(c1);
   });

   if (p2) {
      const cliques = findCliques(connections);
      return cliques
         .reduce(
            (max, clique) => (clique.length > max.length ? clique : max),
            [],
         )
         .sort()
         .join(",");
   }
   const networks = new Set<string>();
   for (const x in connections) {
      for (const y of connections[x]) {
         for (const z of connections[y]) {
            if (connections[z].has(x)) {
               networks.add([x, y, z].sort().join(","));
            }
         }
      }
   }
   return [...networks]
      .filter((e) => e.split(",").some((f) => f.startsWith("t")))
      .length.toString();
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
