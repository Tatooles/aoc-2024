const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  const array = input.split("").map((x) => +x);

  const diskMap = placeBlocks(array);

  const compacted = moveBlocks(diskMap);

  console.log(getChecksum(compacted));
};

const placeBlocks = (input: number[]) => {
  let output = "";

  let isFreeSpace = false;
  let index = 0;
  for (const val of input) {
    for (let i = 0; i < val; i++) {
      if (isFreeSpace) output += ".";
      else {
        output += index;
      }
    }
    if (!isFreeSpace) index++;
    isFreeSpace = !isFreeSpace;
  }

  return output;
};

// Move the blocks from the end into the whitespace
const moveBlocks = (diskMap: string) => {
  const array = diskMap.split("");

  // Two pointers in a while loop
  let i = 0;
  let j = array.length - 1;
  while (i < j) {
    const front = array[i];
    const end = array[j];
    if (front !== ".") i++;

    if (end === ".") {
      j--;
    }

    if (front === "." && end !== ".") {
      array[i] = array[j];
      array[j] = ".";
      i++;
      j--;
    }
  }
  // console.log(array.join(""));
  return array.join("");
};

const getChecksum = (compacted: string) => {
  // Could convert to array of ints, or just parse as we go
  const array = compacted.split("");
  // Should be as simple as multiplying the index by it's value
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== ".") count += parseInt(array[i]) * i;
  }
  return count;
};

console.time("execution time");
main();
console.timeEnd("execution time");
