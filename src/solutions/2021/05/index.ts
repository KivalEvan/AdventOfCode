export const part1 = async (path = "") => {
   const fileInput = await Deno.readTextFile(path + "input.txt");
   const startTime = performance.now();

   const parsed = fileInput
      .split("\n")
      .filter((s) => s !== "")
      .map((s) => s.split(" -> ").map((n) => n.split(",").map((m) => parseInt(m))));

   const sizeX = Math.max(...parsed.map((i) => i.map((n) => n[0])).flat());
   const point: { [key: number]: number } = {};

   for (const line of parsed) {
      if (line[0][0] !== line[1][0] && line[0][1] !== line[1][1]) {
         continue;
      }
      const minX = Math.min(line[0][0], line[1][0]);
      const maxX = Math.max(line[0][0], line[1][0]);
      const minY = Math.min(line[0][1], line[1][1]);
      const maxY = Math.max(line[0][1], line[1][1]);
      if (minY === maxY) {
         for (let x = minX; x <= maxX; x++) {
            const pos = minY * sizeX + x;
            point[pos] = point[pos] ? ++point[pos] : 1;
         }
         continue;
      }
      if (minX === maxX) {
         for (let y = minY; y <= maxY; y++) {
            const pos = y * sizeX + minX;
            point[pos] = point[pos] ? ++point[pos] : 1;
         }
         continue;
      }
   }

   const total = Object.values(point).filter((n) => n >= 2).length;
   const runTime = performance.now() - startTime;
   return [total, runTime];
};

export const part2 = async (path = "") => {
   const fileInput = await Deno.readTextFile(path + "input.txt");
   const startTime = performance.now();

   const parsed = fileInput
      .split("\n")
      .filter((s) => s !== "")
      .map((s) => s.split(" -> ").map((n) => n.split(",").map((m) => parseInt(m))));

   const sizeX = Math.max(...parsed.map((i) => i.map((n) => n[0])).flat());
   const point: { [key: number]: number } = {};

   for (const line of parsed) {
      const dX = Math.abs(line[0][0] - line[1][0]);
      const dY = Math.abs(line[0][1] - line[1][1]);
      if (line[0][0] === line[1][0] || line[0][1] === line[1][1] || dX === dY) {
         const minX = Math.min(line[0][0], line[1][0]);
         const maxX = Math.max(line[0][0], line[1][0]);
         const minY = Math.min(line[0][1], line[1][1]);
         const maxY = Math.max(line[0][1], line[1][1]);
         if (minY === maxY) {
            for (let x = minX; x <= maxX; x++) {
               const pos = minY * sizeX + x;
               point[pos] = point[pos] ? ++point[pos] : 1;
            }
            continue;
         }
         if (minX === maxX) {
            for (let y = minY; y <= maxY; y++) {
               const pos = y * sizeX + minX;
               point[pos] = point[pos] ? ++point[pos] : 1;
            }
            continue;
         }
         if (dX === dY) {
            for (let d = 0; d <= dX; d++) {
               const pos = (line[0][1] < line[1][1] ? minY + d : maxY - d) * sizeX
                  + (line[0][0] < line[1][0] ? minX + d : maxX - d);
               point[pos] = point[pos] ? ++point[pos] : 1;
            }
            continue;
         }
      }
   }

   const total = Object.values(point).filter((n) => n >= 2).length;
   const runTime = performance.now() - startTime;
   return [total, runTime];
};
