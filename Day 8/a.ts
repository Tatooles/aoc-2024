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

/**
 * Find each individual frequency and build map
 * with it's locations in the grid
 */
const createMap = () => {
  grid.forEach((row, i) => {
    row.forEach((val, j) => {
      if (val !== ".") {
        if (!antennas.has(val)) {
          antennas.set(val, []);
        }
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
      const diffRow = locations[second][0] - locations[first][0];
      const diffCol = locations[second][1] - locations[first][1];

      let i = locations[first][0] - diffRow;
      let j = locations[first][1] - diffCol;
      if (i > -1 && i < grid.length && j > -1 && j < grid[i].length) {
        antinodes.add(`${i},${j}`);
      }

      i = locations[second][0] + diffRow;
      j = locations[second][1] + diffCol;

      if (i > -1 && i < grid.length && j > -1 && j < grid[i].length) {
        antinodes.add(`${i},${j}`);
      }
    }
  }
};

console.time("execution time");
main();
console.timeEnd("execution time");
