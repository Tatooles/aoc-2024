const diskMap: number[] = [];
const freeRegistry: { index: number; length: number }[] = [];
const fileRegistry: { value: number; index: number; length: number }[] = [];

const main = async () => {
  const input = await Deno.readTextFile("test.txt");

  const array = input.split("").map((x) => +x);

  const diskMap = placeBlocks(array);

  printString();

  registerBlocks();

  console.log(freeRegistry, fileRegistry);

  const compacted = moveBlocks();

  // console.log(getChecksum(compacted));
};

const printString = () => {
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
  let isFreeSpace = false;
  let index = 0;
  for (const val of input) {
    for (let i = 0; i < val; i++) {
      if (isFreeSpace) diskMap.push(-1);
      else {
        diskMap.push(index);
      }
    }
    if (!isFreeSpace) index++;
    isFreeSpace = !isFreeSpace;
  }
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
const registerBlocks = () => {
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
};

// Move the blocks from the end into the whitespace
// TODO: Now just move the entire block
// Need to measure the size of the filled and free block
const moveBlocks = () => {
  // Starting at the back of the registries
  let filePointer = fileRegistry.length - 1;
  for (let i = 0; i < diskMap.length; i++) {
    if (i === -1) {
      // Find the length of this free space
      const space = freeRegistry.find((x) => x.index === 1);
      if (space && space.length >= fileRegistry[filePointer].length) {
        // Place block here
        for (let j = 0; j < fileRegistry[filePointer].length; j++) {
          diskMap[i + j] = fileRegistry[filePointer].value;
        }
      }
    }
  }
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
