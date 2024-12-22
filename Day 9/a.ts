const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  const array = input.split("").map((x) => +x);

  const diskMap = placeBlocks(array);

  const compacted = moveBlocks(diskMap);

  console.log(getChecksum(compacted));
};

const placeBlocks = (input: number[]) => {
  const output = [];

  let isFreeSpace = false;
  let index = 0;
  for (const val of input) {
    for (let i = 0; i < val; i++) {
      if (isFreeSpace) output.push(-1);
      else {
        output.push(index);
      }
    }
    if (!isFreeSpace) index++;
    isFreeSpace = !isFreeSpace;
  }

  return output;
};

// Move the blocks from the end into the whitespace
const moveBlocks = (diskMap: number[]) => {
  // Two pointers in a while loop
  let i = 0;
  let j = diskMap.length - 1;
  while (i < j) {
    const front = diskMap[i];
    const end = diskMap[j];
    if (front !== -1) i++;

    if (end === -1) {
      j--;
    }

    if (front === -1 && end !== -1) {
      diskMap[i] = diskMap[j];
      diskMap[j] = -1;
      i++;
      j--;
    }
  }
  return diskMap;
};

const getChecksum = (compacted: number[]) => {
  // Simply multiply the index by value
  let count = 0;
  for (let i = 0; i < compacted.length && compacted[i] !== -1; i++) {
    count += compacted[i] * i;
  }
  return count;
};

console.time("execution time");
main();
console.timeEnd("execution time");
