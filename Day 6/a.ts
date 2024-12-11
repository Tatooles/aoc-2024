const input = await Deno.readTextFile("input.txt");

const grid = input.split(/\r?\n/).map((x) => x.split(""));

const guardChars = ["^", ">", "<", "v"];

let [guardY, guardX] = [-1, -1];

const printGrid = () => {
  for (let row of grid) {
    console.log(row.join(""));
  }
  console.log();
};

// Find guard
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "^") {
      [guardY, guardX] = [i, j];
    }
  }
}

console.log("guard at", guardX, guardY);

let guardChar = "^";

let count = 1;

// Iterate guard
while (
  // While not on the edge of the screen
  (guardX + 1 < grid[0].length) && (guardX - 1 > -1) &&
  (guardY + 1 < grid.length) && (guardY - 1 > -1)
) {
  let [nextX, nextY] = [guardX, guardY];
  let turnChar = "";

  if (guardChar === "^") {
    nextY--;
    turnChar = ">";
  }

  if (guardChar === ">") {
    nextX++;
    turnChar = "v";
  }

  if (guardChar === "v") {
    nextY++;
    turnChar = "<";
  }

  if (guardChar === "<") {
    nextX--;
    turnChar = "^";
  }

  const nextSquare = grid[nextY][nextX];
  if (nextSquare === "#") {
    guardChar = turnChar;
  } else { // Move into next square
    if (nextSquare !== "X") {
      count++;
    }
    grid[nextY][nextX] = guardChar;
    grid[guardY][guardX] = "X";
    guardX = nextX;
    guardY = nextY;
  }
  // printGrid();
}

console.log(count);
