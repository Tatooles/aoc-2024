const input = await Deno.readTextFile("test.txt");

// Convert text into two lists, one for each side
const arr = input.split(/\r?\n/);

const reports = arr.map(x => x.split(" ")).map(x => x.map(y => parseInt(y)));

let count = 0;

for(const report of reports) {
  let isSafe = true;
  // Determine if safe

  // Check if increasing
  for(let i = 1; i < report.length; i++) {
    if(report[i] - report[i-1] > 3) isSafe = false;
  }

  // Check if decreasing
  for(let i = 1; i < report.length; i++) {
    if(report[i-1] - report[i] > 3) isSafe = false;
  }

  console.log(report, "is safe:", isSafe);
  if(isSafe) count++;
}

console.log(count);