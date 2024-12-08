const input = await Deno.readTextFile("input.txt");

// Parse into 2D grid
const grid = input.split(/\r?\n/);

const checkXMAS = (i: number, j: number) => {
  let hasXMAS = 1;
  // Check the diagonal blocks for the correct characters
  // There are a couple cases
  const topLeft = grid[i - 1][j - 1];
  const bottomRight = grid[i + 1][j + 1];

  if (
    !(topLeft === "M" && bottomRight === "S") &&
    !(topLeft === "S" && bottomRight === "M")
  ) {
    hasXMAS = 0;
  }

  const topRight = grid[i - 1][j + 1];
  const bottomLeft = grid[i + 1][j - 1];

  if (
    !(topRight === "M" && bottomLeft === "S") &&
    !(topRight === "S" && bottomLeft === "M")
  ) {
    hasXMAS = 0;
  }

  return hasXMAS;
};

let total = 0;

// Brute force check every A in the grid for a MAS
// Ignoring edge because that cannot contain a MAS
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid.length - 1; j++) {
    if (grid[i][j] === "A") {
      total += checkXMAS(i, j);
    }
  }
}

console.log(total);
