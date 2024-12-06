const input = await Deno.readTextFile("input.txt");

// Convert text into two lists, one for each side
const arr = input.split(/\r?\n/);

const reports = arr.map(x => x.split(" ")).map(x => x.map(y => parseInt(y)));

let count = 0;

for(const report of reports) {
  let isSafe = true;
  // Determine if safe

  // Do we have to compare with 1+2?


  let increasing = true;
  let decreasing = true;
  // Check if increasing
  // Check if decreasing
  for(let i = 1; i < report.length; i++) {
    let diff = report[i] - report[i-1];
    if(diff < 1 || diff > 3) increasing = false;
    if(diff > -1 || diff < -3) decreasing = false;
  }

  let increasingSkip = 1;
  let decreasingSkip = 1;
  // Second check for if one we skip one
  for(let i = 2; i < report.length; i++) {
    let diff = report[i] - report[i-2];
    if(diff < 1 || diff > 3) increasingSkip--;
    if(diff > -1 || diff < -3) decreasingSkip--;
  }

  // console.log(report, "is safe:", increasing, decreasing, increasingSkip, decreasingSkip);
  if(increasing || decreasing || increasingSkip >= 0 || decreasingSkip >= 0) count++;
}

console.log(count);