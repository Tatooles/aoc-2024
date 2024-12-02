const input = await Deno.readTextFile("input.txt");

// Convert text into two lists, one for each side
const arr = input.split(/\r?\n/);

const a = [];
const b = [];

for(const pair of arr) {
  const split = pair.split("   ");
  a.push(split[0]);
  b.push(split[1]);
}

const left = a.sort().map(x => parseInt(x));
const right = b.sort().map(x => parseInt(x));


let difference = 0;

// After sorting, calculate difference
for(let i = 0; i < left.length; i++) {
  difference += Math.abs(left[i] - right[i]);
}

console.log(difference);