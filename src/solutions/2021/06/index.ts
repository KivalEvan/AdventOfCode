export const part1 = async (path = "") => {
   const fileInput = await Deno.readTextFile(path + "input.txt");
   const startTime = performance.now();

   const fish = fileInput
      .trim()
      .split(",")
      .map((n) => parseInt(n));

   const count: { [key: number]: number } = {
      0: fish.filter((n) => n === 0).length,
      1: fish.filter((n) => n === 1).length,
      2: fish.filter((n) => n === 2).length,
      3: fish.filter((n) => n === 3).length,
      4: fish.filter((n) => n === 4).length,
      5: fish.filter((n) => n === 5).length,
      6: fish.filter((n) => n === 6).length,
      7: 0,
      8: 0,
   };

   for (let day = 0; day < 80; day++) {
      count[(7 + day) % 9] += count[day % 9];
   }

   const total = Object.values(count).reduce((t, n) => t + n, 0);
   const runTime = performance.now() - startTime;
   return [total, runTime];
};

export const part2 = async (path = "") => {
   const fileInput = await Deno.readTextFile(path + "input.txt");
   const startTime = performance.now();

   const fish = fileInput
      .trim()
      .split(",")
      .map((n) => parseInt(n));

   const count: { [key: number]: number } = {
      0: fish.filter((n) => n === 0).length,
      1: fish.filter((n) => n === 1).length,
      2: fish.filter((n) => n === 2).length,
      3: fish.filter((n) => n === 3).length,
      4: fish.filter((n) => n === 4).length,
      5: fish.filter((n) => n === 5).length,
      6: fish.filter((n) => n === 6).length,
      7: 0,
      8: 0,
   };

   for (let day = 0; day < 256; day++) {
      count[(7 + day) % 9] += count[day % 9];
   }

   const total = Object.values(count).reduce((t, n) => t + n, 0);
   const runTime = performance.now() - startTime;
   return [total, runTime];
};
