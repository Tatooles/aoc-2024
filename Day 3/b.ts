const input = await Deno.readTextFile("input.txt");


let total = 0;

const dos = input.split("do()");
const donts = dos.map(x => x.split("don't()")[0]);

donts.forEach(element => {
  let regexMatch = element.matchAll(/mul\((\d+),(\d+)\)/g);

  regexMatch.forEach(element => {
    total += element[1] * element[2];
  });
})

// let regexMatch = donts.matchAll(/mul\((\d+),(\d+)\)/g);
// // I think the first column of don'ts is what we want


// regexMatch.forEach(element => {
//   total += element[1] * element[2];
// });

console.log(total);