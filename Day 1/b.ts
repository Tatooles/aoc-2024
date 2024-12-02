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

let similarity = 0;

// Create map with each number and how often it appears
const map = right.reduce((map, num) => {
  map.set(num, (map.get(num) || 0) + 1);
  return map;
}, new Map());

// Then iterate through a and calculate similarity
for(const el of left) {
  if(map.has(el)) {
    similarity += el * map.get(el);
  }
}

console.log(similarity);