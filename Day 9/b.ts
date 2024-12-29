const diskMap: number[] = [];
const freeRegistry: { index: number; length: number }[] = [];
const fileRegistry: { value: number; index: number; length: number }[] = [];

const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  const array = input.split("").map((x) => +x);

  initializeDisk(array);

  registerBlocks();

  moveBlocks();

  getChecksum();
};

const printDisk = () => {
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

const initializeDisk = (input: number[]) => {
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
 * One array is for free space, one is for files
 *
 * Arays will contain index and length
 * File array will also contain the value
 */
const registerBlocks = () => {
  let length = 0;
  let startIndex = 0;
  let currentVal = diskMap[0];
  for (let i = 0; i < diskMap.length + 1; i++) {
    if (diskMap[i] != currentVal || diskMap[i] === undefined) {
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

/**
 * Move entire blocks from the end into the whitespace
 * Try moving every file starting from the back
 */
const moveBlocks = () => {
  for (const file of fileRegistry.reverse()) {
    placeFile(file);
  }
};

/**
 * Must find valid empty space for the given file
 *
 * Once space is found:
 *  Space is filled with file
 *  Original file location is made empty
 *
 * @param file
 * @returns
 */
const placeFile = (file: {
  value: number;
  index: number;
  length: number;
}) => {
  const spaceIndex = findSpace(file.length, file.index);

  if (spaceIndex === -1) return;

  for (let j = 0; j < file.length; j++) {
    diskMap[spaceIndex + j] = file.value;
    diskMap[file.index + j] = -1;
  }
};

/**
 * Search then modify free registry
 *
 * Space must be large enough, and have an index smaller than file
 *
 * @param fileLength
 * @param fileIndex
 * @returns
 */
const findSpace = (fileLength: number, fileIndex: number) => {
  let spaceIndex = -1;

  for (const space of freeRegistry) {
    if (space.length >= fileLength && space.index < fileIndex) {
      spaceIndex = space.index;

      // Modify this space to contain the block
      space.index += fileLength;
      space.length -= fileLength;

      break;
    }
  }

  return spaceIndex;
};

/**
 *  Simply multiply the index by it's value
 */
const getChecksum = () => {
  let count = 0;
  for (let i = 0; i < diskMap.length; i++) {
    if (diskMap[i] !== -1) count += diskMap[i] * i;
  }
  console.log(count);
};

console.time("execution time");
main();
console.timeEnd("execution time");
