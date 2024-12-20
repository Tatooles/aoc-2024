const input = await Deno.readTextFile("input.txt");

const grid = input.split(/\r?\n/).map((x) => x.split(""));

const printGrid = (gridInstance: string[][]) => {
  for (const row of gridInstance) {
    console.log(row.join(""));
  }
  console.log();
};

const frequencies = new Map<string, number[][]>();

// The locations of the antinodes are stored here
const antinodes = new Set<string>();

// Find each individual frequenct
grid.forEach((row, i) => {
  row.forEach((val, j) => {
    if (val !== ".") {
      if (!frequencies.has(val)) {
        frequencies.set(val, []);
      }
      frequencies.get(val)!.push([i, j]);
    }
  });
});

const countAntinodes = (frequency: string) => {
  // Create a copy of the grid to play with
  const gridCopy: string[][] = JSON.parse(JSON.stringify(grid));

  // Clear grid to make things easier
  for (let i = 0; i < gridCopy.length; i++) {
    for (let j = 0; j < gridCopy[i].length; j++) {
      if (gridCopy[i][j] !== frequency) {
        gridCopy[i][j] = ".";
      }
    }
  }

  const locations = frequencies.get(frequency);

  if (!locations?.length || locations?.length < 2) {
    return;
  }

  // Go through every possible combo of towers
  for (let first = 0; first < locations.length; first++) {
    for (let second = first + 1; second < locations.length; second++) {
      // Compare the two
      const diffRow = locations[second][0] - locations[first][0];
      const diffCol = locations[second][1] - locations[first][1];
      // console.log("diff row, col", diffRow, diffCol);

      // Attempt to place a thing on both sides of each, 2 total locations!
      // Try 1st oppsite of second
      let i = locations[first][0] - diffRow;
      let j = locations[first][1] - diffCol;
      if (i > -1 && i < gridCopy.length && j > -1 && j < gridCopy[i].length) {
        antinodes.add(`${i},${j}`);
      }

      i = locations[second][0] + diffRow;
      j = locations[second][1] + diffCol;

      if (i > -1 && i < gridCopy.length && j > -1 && j < gridCopy[i].length) {
        antinodes.add(`${i},${j}`);
      }
      // Maybe just toss it in a try catch instead of checking for errors LOL
    }
  }
  // printGrid(gridCopy);
};

// Need to count number of antinodes per frequency
for (const frequency of frequencies.keys()) {
  countAntinodes(frequency);
}

console.log(antinodes.size);

// TODO: Getting lots of negaive antinodes, fix that
