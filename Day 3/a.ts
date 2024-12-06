const input = await Deno.readTextFile("input.txt");

let regexMatch = input.matchAll(/mul\((\d+),(\d+)\)/g);

let total = 0;

regexMatch.forEach(element => {
  total += element[1] * element[2];
});

console.log(total);