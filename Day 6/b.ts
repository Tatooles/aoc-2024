const input = await Deno.readTextFile("test.txt");

const mainGrid = input.split(/\r?\n/).map((x) => x.split(""));

let [guardY, guardX] = [-1, -1];

const printGrid = (localGrid: string[][]) => {
  for (let row of localGrid) {
    console.log(row.join(""));
  }
  console.log();
};

// Find guard
const findGuard = () => {
  for (let i = 0; i < mainGrid.length; i++) {
    for (let j = 0; j < mainGrid[i].length; j++) {
      if (mainGrid[i][j] === "^") {
        [guardY, guardX] = [i, j];
      }
    }
  }
};

const runLoop = (grid: string[][]) => {
  let guardChar = "^";
  findGuard();
  let stepsTaken = 0;
  // Iterate guard
  while (
    // While not on the edge of the screen
    (guardX + 1 < grid[0].length) && (guardX - 1 > -1) &&
    (guardY + 1 < grid.length) && (guardY - 1 > -1)
  ) {
    // This is the infinite loop check :)
    if (stepsTaken > 100000) {
      return 1;
    }
    stepsTaken++;
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
      grid[nextY][nextX] = guardChar;
      grid[guardY][guardX] = "X";
      guardX = nextX;
      guardY = nextY;
    }
    // printGrid(grid);
  }
  return 0;
};

const checkLoop = (i: number, j: number) => {
  // Make a copy of the grid and check that
  const gridCopy = JSON.parse(JSON.stringify(mainGrid));
  gridCopy[i][j] = "#";
  return runLoop(gridCopy);
};

// Create initial grid so we can see which squares to test
const copyGrid: string[][] = JSON.parse(JSON.stringify(mainGrid));
runLoop(copyGrid);

let count = 0;

copyGrid.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col === "X") {
      // Essentially brute force try placing an obstacle here and see if it loops
      count += checkLoop(i, j);
    }
  });
});

console.log(count);
