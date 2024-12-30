let map: number[][];

const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  map = input.split(/\n/).map((x) => x.split("").map((x) => +x));

  console.log(traceTrailHeads());
};

const traceTrailHeads = () => {
  let total = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        // Found trailhead
        total += traceTrail(i, j);
      }
    }
  }
  return total;
};

/**
 * Find all paths from this trailhead to the end using DFS
 *
 * @param i
 * @param j
 * @returns Number of paths to a trail end
 */
const traceTrail = (i: number, j: number) => {
  let paths = 0;
  const stack = [[i, j]];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (map[node[0]][node[1]] === 9) {
      // Found a path
      paths += 1;
    }

    const neighbors = findNeighbors(node[0], node[1]);

    for (const neighbor of neighbors) {
      stack.push(neighbor);
    }
  }
  return paths;
};

/**
 * Find all valid neighbors for this square within a path
 * @param i
 * @param j
 * @returns List of neighbors
 */
const findNeighbors = (i: number, j: number) => {
  const neighbors = [];

  // Top
  if (i - 1 > -1 && map[i - 1][j] === map[i][j] + 1) {
    neighbors.push([i - 1, j]);
  }

  // Bottom
  if (i + 1 < map.length && map[i + 1][j] === map[i][j] + 1) {
    neighbors.push([i + 1, j]);
  }

  // Left
  if (j - 1 > -1 && map[i][j - 1] === map[i][j] + 1) {
    neighbors.push([i, j - 1]);
  }

  // Right
  if (j + 1 < map[i].length && map[i][j + 1] === map[i][j] + 1) {
    neighbors.push([i, j + 1]);
  }

  return neighbors;
};

console.time("execution time");
main();
console.timeEnd("execution time");
