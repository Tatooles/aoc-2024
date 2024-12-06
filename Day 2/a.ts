const input = await Deno.readTextFile("input.txt");

// Convert text into two lists, one for each side
const arr = input.split(/\r?\n/);

const reports = arr.map(x => x.split(" ")).map(x => x.map(y => parseInt(y)));

let count = 0;

for(const report of reports) {
  let isSafe = true;
  // Determine if safe

  let increasing = true;
  // Check if increasing
  for(let i = 1; i < report.length; i++) {
    let diff = report[i] - report[i-1];
    if(diff < 1 || diff > 3) increasing = false;
  }

  let decreasing = true;
  // Check if decreasing
  for(let i = 1; i < report.length; i++) {
    let diff = report[i-1] - report[i];
    if(diff < 1 || diff > 3) decreasing = false;
  }

  // console.log(report, "is safe:", increasing || decreasing);
  if(increasing || decreasing) count++;
}

console.log(count);