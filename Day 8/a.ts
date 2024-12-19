const input = await Deno.readTextFile("test.txt");

const grid = input.split(/\r?\n/).map((x) => x.split(""));

const printGrid = (gridInstance: string[][]) => {
  for (const row of gridInstance) {
    console.log(row.join(""));
  }
  console.log();
};

const frequencies = new Map<string, number[][]>();

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

const countAntinodes = (frequency: string): number => {
  // Create a copy of the grid to play with
  let frequencyCount = 0;

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
    return 0;
  }

  // Go through every possible combo of towers
  for (let first = 0; first < locations.length; first++) {
    for (let second = first + 1; second < locations.length; second++) {
      // Compare the two
      let diffRow = locations[second][0] - locations[first][0];
      let diffCol = locations[second][1] - locations[first][1];
      console.log("diff row, col", diffRow, diffCol);

      // Attempt to place a thing on both sides of each, 2 total locations!
      // Try 1st oppsite of second
      try {
        gridCopy[locations[first][0] - diffRow][locations[first][1] - diffCol] =
          "#";
        frequencyCount++;
      } catch (_e) {
        // doesnt matter
      }

      try {
        gridCopy[locations[second][0] + diffRow][
          locations[second][1] + diffCol
        ] = "#";
        frequencyCount++;
      } catch (_e) {
        // dont matta
      }
      // Maybe just toss it in a try catch instead of checking for errors LOL
    }
  }
  printGrid(gridCopy);

  return frequencyCount;
};

console.log(frequencies);

let count = 0;
// Need to count number of antinodes per frequency
for (const frequency of frequencies.keys()) {
  count += countAntinodes(frequency);
}

console.log(count);
