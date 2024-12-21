let grid: string[][];

// Store frequencies in map, Frequency is key, List of locations is value
const antennas = new Map<string, number[][]>();

// The locations of the antinodes are stored in set to prevent duplicates
const antinodes = new Set<string>();

const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  grid = input.split(/\r?\n/).map((x) => x.split(""));

  createMap();

  for (const frequency of antennas.keys()) {
    countAntinodes(frequency);
  }

  // placeAntinodes(JSON.parse(JSON.stringify(grid)));
  console.log(antinodes.size);
};

/**
 * Helper function to print grid
 * @param gridInstance
 */
const printGrid = (gridInstance: string[][]) => {
  for (const row of gridInstance) {
    console.log(row.join(""));
  }
  console.log();
};

const placeAntinodes = (grid: string[][]) => {
  for (const antinode of antinodes) {
    const [i, j] = antinode.split(",");
    grid[parseInt(i)][parseInt(j)] = "#";
  }
  printGrid(grid);
};

/**
 * Find each individual frequency and build map
 * with it's locations in the grid
 *
 * Every antenna is also an antinode
 */
const createMap = () => {
  grid.forEach((row, i) => {
    row.forEach((val, j) => {
      if (val !== ".") {
        if (!antennas.has(val)) {
          antennas.set(val, []);
        }
        antinodes.add(`${i},${j}`);
        antennas.get(val)!.push([i, j]);
      }
    });
  });
};

/**
 * Goes through every possible combination of towers for this frequency,
 * compares the two, and determines if an antinode can go oppsite each one.
 *
 * @param frequency - Which towers to look at
 * @returns
 */
const countAntinodes = (frequency: string) => {
  const locations = antennas.get(frequency);

  if (!locations?.length || locations?.length < 2) {
    return;
  }

  for (let first = 0; first < locations.length; first++) {
    for (let second = first + 1; second < locations.length; second++) {
      // Now we need to try every possible location by applying diffRow and diffCol
      // Multiple times
      const diffRow = locations[second][0] - locations[first][0];
      const diffCol = locations[second][1] - locations[first][1];

      let firstI = locations[first][0];
      let firstJ = locations[first][1];

      let secondI = locations[second][0];
      let secondJ = locations[second][1];

      // TODO: Find condition to break loop
      let loops = 0;
      while (loops < 100) {
        loops++;

        firstI -= diffRow;
        firstJ -= diffCol;
        if (
          firstI > -1 && firstI < grid.length && firstJ > -1 &&
          firstJ < grid[firstI].length
        ) {
          antinodes.add(`${firstI},${firstJ}`);
        }

        secondI += diffRow;
        secondJ += diffCol;

        if (
          secondI > -1 && secondI < grid.length && secondJ > -1 &&
          secondJ < grid[secondI].length
        ) {
          antinodes.add(`${secondI},${secondJ}`);
        }
      }
    }
  }
};

console.time("execution time");
main();
console.timeEnd("execution time");
