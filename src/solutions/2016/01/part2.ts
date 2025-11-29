const input = (await Deno.readTextFile("input.txt")).split(", ");

let direction: "up" | "down" | "left" | "right" = "up";
let changeDirection: { [key: string]: any } = {
   L: {
      up: "left",
      down: "right",
      left: "down",
      right: "up",
   },
   R: {
      up: "right",
      down: "left",
      left: "up",
      right: "down",
   },
};
const visited: [number, number][] = [];
const position: [number, number] = [0, 0];
const move = (step: number) => {
   for (let s = 0; s < step; s++) {
      if (direction === "up") {
         position[0]++;
      }
      if (direction === "down") {
         position[0]--;
      }
      if (direction === "left") {
         position[1]--;
      }
      if (direction === "right") {
         position[1]++;
      }
      if (visited.find((n) => n[0] === position[0] && n[1] === position[1])) {
         // just throw it, this is the destination
         throw Math.abs(position[0]) + Math.abs(position[1]);
      }
      visited.push([...position]);
   }
};

for (let i = 0; i < input.length; i++) {
   direction = changeDirection[input[i][0]][direction];
   move(parseInt(input[i].slice(1)));
}
