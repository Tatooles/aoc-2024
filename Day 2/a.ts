const input = await Deno.readTextFile("input.txt");

const arr = input.split(/\r?\n/);

// Convert text into a a 2D array, each row is an array that represents a report
const reports = arr.map(x => x.split(" ")).map(x => x.map(y => parseInt(y)));

let count = 0;

for(const report of reports) {
  let increasing = true;
  let decreasing = true;

  for(let i = 1; i < report.length; i++) {
    let diff = report[i] - report[i-1];
    // Check if increasing
    if(diff < 1 || diff > 3) increasing = false;
    // Check if decreasing
    if(diff > -1 || diff < -3) decreasing = false;
  }

  if(increasing || decreasing) count++;
}

console.log(count);