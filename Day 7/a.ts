const input = await Deno.readTextFile("test.txt");

const parsed = input.split(/\r?\n/).map((x) => x.split(": ")).map((
  [i, j],
) => [i, j.split(" ")]);

for (const equation of parsed) {
  // Number of spots for operators
  const spots = equation[1].length - 1;

  // Total combos is 2 to the spots
  // Need to test each one
  // Recursive function?
}

console.log(parsed);
