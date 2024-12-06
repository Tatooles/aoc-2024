const input = await Deno.readTextFile("input.txt");

const arr = input.split(/\r?\n/);

// Convert text into a a 2D array, each row is an array that represents a report
const reports = arr.map(x => x.split(" ")).map(x => x.map(y => parseInt(y)));

let count = 0;

for(const report of reports) {
  let increasing = true;
  let decreasing = true;
  
  // Only 1 skip is allowed
  let increasingSkip = 1;
  let decreasingSkip = 1;
  
  for(let i = 1; i < report.length; i++) {
    let diff = report[i] - report[i-1];
    // Check if increasing
    if(diff < 1 || diff > 3) increasing = false;
    // Check if decreasing
    if(diff > -1 || diff < -3) decreasing = false;

    let skipDiff = report[i] - report[i-2];
    // Check if increasing with a skip
    if(skipDiff < 1 || skipDiff > 3) increasingSkip--;
    // Check if decreasing with a skip
    if(skipDiff > -1 || skipDiff < -3) decreasingSkip--;
  }

  if(increasing || decreasing || increasingSkip > -1 || decreasingSkip > -1) count++;
}

console.log(count);