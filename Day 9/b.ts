const diskMap: number[] = [];
const freeRegistry: { index: number; length: number }[] = [];
const fileRegistry: { value: number; index: number; length: number }[] = [];

const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  const array = input.split("").map((x) => +x);

  placeBlocks(array);

  // printString();

  registerBlocks();

  // console.log(freeRegistry, fileRegistry);

  moveBlocks();

  console.log(getChecksum());
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
  // Need to try every file starting from the back
  for (const file of fileRegistry.reverse()) {
    placeFile(file);
  }
};

const placeFile = (file: {
  value: number;
  index: number;
  length: number;
}) => {
  // Find valid free space
  const [spaceIndex, spaceLength] = findSpace(file.length, file.index);

  // No space for this file
  if (spaceIndex === -1) return;

  // Index also has to be lower
  for (let j = 0; j < file.length; j++) {
    // Place block here
    diskMap[spaceIndex + j] = file.value;

    // Zero out end section
    diskMap[file.index + j] = -1;
  }
};

// Space needs to be, large enough, and have an index smaller than the file's
const findSpace = (length: number, index: number) => {
  // will have to search then modify the free registry

  let returnIndex = -1;
  let returnLength = -1;
  // Start from the beginning
  for (const space of freeRegistry) {
    if (space.length >= length && space.index < index) {
      returnIndex = space.index;
      returnLength = space.length;

      // Now modify this space to contain the block
      space.index += length;
      space.length -= length;

      break;
    }
  }

  return [returnIndex, returnLength];
};

const getChecksum = () => {
  // Simply multiply the index by value
  let count = 0;
  for (let i = 0; i < diskMap.length; i++) {
    if (diskMap[i] !== -1) count += diskMap[i] * i;
  }
  return count;
};

console.time("execution time");
main();
console.timeEnd("execution time");
