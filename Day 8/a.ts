const input = await Deno.readTextFile("test.txt");

const grid = input.split(/\r?\n/).map((x) => x.split(""));

const printGrid = (gridInstance: string[][]) => {
  for (const row of gridInstance) {
    console.log(row.join(""));
  }
  console.log();
};

printGrid(grid);

const frequencies = new Set<string>();

// Find each individual frequenct
grid.forEach((row) => {
  row.forEach((val) => {
    if (val !== ".") frequencies.add(val);
  });
});

const countAntinodes = (frequency: string) => {
  // Create a copy of the grid to play with
  const gridCopy: string[][] = JSON.parse(JSON.stringify(grid));
  printGrid(gridCopy);

  // Clear grid to make things easier
  for (let i = 0; i < gridCopy.length; i++) {
    for (let j = 0; j < gridCopy[i].length; j++) {
      if (gridCopy[i][j] !== frequency) {
        gridCopy[i][j] = ".";
      }
    }
  }

  printGrid(gridCopy);

  // gridCopy.forEach((row) => {
  //   row.forEach((val) => {
  //     if (val !== frequency) {
  //       // Do something
  //       // The difference between one tower and another is the difference between that tower and the antinode
  //       // It's just that a lot of them fall outside the screen!
  //     }
  //   });
  // });

  return 1;
};

let count = 0;
// Need to count number of antinodes per frequency
for (const frequency of frequencies) {
  count += countAntinodes(frequency);
}
