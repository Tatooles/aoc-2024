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

a.sort();
b.sort();

let difference = 0;

// I think we need a map with each number and how often it appears

const map = new Map();

for(const el of b) {
  if(map.has(el)) {
    map.set(el, map.get(el) + 1);
  } else {
    map.set(el, 1);
  }
}

// Then iterate through a and get the values in the map
for(const el of a) {
  if(map.has(el)) {
    difference += parseInt(el) * map.get(el);
  }
}


console.log(difference);