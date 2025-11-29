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
const position = [0, 0];
const move = (step: number) => {
   if (direction === "up") {
      position[0] += step;
   }
   if (direction === "down") {
      position[0] -= step;
   }
   if (direction === "left") {
      position[1] -= step;
   }
   if (direction === "right") {
      position[1] += step;
   }
};

for (let i = 0; i < input.length; i++) {
   direction = changeDirection[input[i][0]][direction];
   move(parseInt(input[i].slice(1)));
}

console.log(Math.abs(position[0]) + Math.abs(position[1]));
