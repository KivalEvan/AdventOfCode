let readme = `# Advent of Code 2021

## Solution

My solution to Advent of Code 2021.

### Benchmark

|   Day   |   Part 1 |   Part 2 |    Total |
| :-----: | -------: | -------: | -------: |
`;

let overallA1 = 0;
let overallA2 = 0;
let overall = 0;
for (let day = 1; day <= 25; day++) {
   const path = `./day-${day.toString().padStart(2, "0")}/`;
   let bA1 = 0,
      bA2 = 0;
   try {
      const d = await import(path + "index.ts");
      console.log(`warming up day ${day}`);
      for (let i = 0; i < 100; i++) {
         await d.part1(path);
         await d.part2(path);
      }
      const benchmark: { [key: number]: number[] } = {
         1: [],
         2: [],
      };
      console.log(`benchmarking day ${day}`);
      for (let i = 0; i < 100; i++) {
         const part1 = await d.part1(path);
         const part2 = await d.part2(path);
         benchmark[1].push(part1[1]);
         benchmark[2].push(part2[1]);
      }
      bA1 = benchmark[1].reduce((t, n) => t + n, 0) / benchmark[1].length;
      bA2 = benchmark[2].reduce((t, n) => t + n, 0) / benchmark[2].length;
   }
   catch (_e) {
      console.error(`day ${day} is not done yet`);
   }
   finally {
      overallA1 += bA1;
      overallA2 += bA2;
      overall += bA1 + bA2;
      readme += `| ${day} | ${bA1 ? bA1.toFixed(3) : 0}ms | ${bA2 ? bA2.toFixed(3) : 0}ms | ${
         bA1 + bA2 ? (bA1 + bA2).toFixed(3) : 0
      }ms |\n`;
   }
}
readme += `| Overall | ${overallA1.toFixed(3)}ms | ${
   overallA2.toFixed(
      3,
   )
}ms | ${overall.toFixed(3)}ms |

#### Methodology

The benchmark is measured by mean of 100 run loop, with 100 run loop as warm-up, through all excluding IO (typically takes around 2-4ms). Programmed using \`TypeScript\` ran via \`Deno 1.16.3\` with flag \`--allow-read --allow-write --allow-hrtime --watch\`. Part 1 and part 2 is separated in the runtime. CPU used is \`Intel Core i9-9900K\`. Single run typically result up to 1-16x duration depending on the test.
`;
Deno.writeTextFile("README.md", readme);
