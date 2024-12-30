let map: number[][];

const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  map = input.split(/\n/).map((x) => x.split("").map((x) => +x));

  console.log(findTrailHeads());
};

const findTrailHeads = () => {
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

const traceTrail = (i: number, j: number) => {
  const foundEnds = new Set();
  const stack = [[i, j]];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (map[node[0]][node[1]] === 9) {
      // Found a path
      foundEnds.add(`${node[0]}${node[1]}`);
    }

    const neighbors = findNeighbors(node[0], node[1]);

    for (const neighbor of neighbors) {
      stack.push(neighbor);
    }
  }
  // console.log("trailhead", i, j, "scored", foundEnds);
  // console.log("visited", visited);
  return foundEnds.size;
};

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
