const disk: any = [];

const allFiles: any = [];

const main = async () => {
  const input = await Deno.readTextFile("test.txt");

  const array = input.split("").map((x) => +x);

  const diskMap = placeBlocks(array);

  const [freeRegistry, fileRegistry] = registerBlocks(diskMap);

  console.log(freeRegistry, fileRegistry);

  // const compacted = moveBlocks(diskMap);

  // console.log(getChecksum(compacted));
};

const printString = (diskMap: number[]) => {
  let string = "";
  for (const val of diskMap) {
    if (val === -1) {
      string += ".";
    } else {
      string += val;
    }
  }
  console.log(string);
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

/**
 * Register blocks into two arrays
 *
 * The array will look like this
 *
 * I think we don't really need value
 * [value, first index, length]
 *
 * One array is for free space, one is for files
 */
const registerBlocks = (diskMap: number[]) => {
  const fileRegistry = [];
  const freeRegistry = [];
  let length = 0;
  let startIndex = 0;
  let currentVal = diskMap[0];
  for (let i = 0; i < diskMap.length + 1; i++) {
    if (diskMap[i] != currentVal || diskMap[i] === undefined) {
      // Onto a new value
      if (diskMap[i - 1] === -1) {
        freeRegistry.push({ "index": i - length, "length": length });
      } else {
        fileRegistry.push({
          "value": currentVal,
          "index": startIndex,
          "length": length,
        });
      }
      startIndex = i;
      currentVal = diskMap[i];
      length = 0;
    }
    length++;
  }

  return [freeRegistry, fileRegistry];
};

// Move the blocks from the end into the whitespace
// TODO: Now just move the entire block
// Need to measure the size of the filled and free block
const moveBlocks = (diskMap: number[]) => {
  // Two pointers in a while loop
  let i = 0;
  let j = diskMap.length - 1;
  while (i < j) {
    const front = diskMap[i];

    // End pointer now needs to represent a whole block
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
