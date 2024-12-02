const input = await Deno.readTextFile("input.txt");

// Convert text into two lists, one for each side
const arr = input.split(/\r?\n/);


const a = [];
const b = [];

for(const pair of arr) {
  const split = pair.split("  ");
  a.push(split[0]);
  b.push(split[1]);
}

a.sort();
b.sort();

// Now that it's sorted, we go down the line and compare

let difference = 0;

for(let i = 0; i < a.length; i++) {
  difference += Math.abs(parseInt(a[i]) - parseInt(b[i]));
}

console.log(difference);