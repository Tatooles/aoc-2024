const input = await Deno.readTextFile("input.txt");

let total = 0;

input.split("do()").map((x) => x.split("don't()")[0])
  .forEach((element) => {
    element.matchAll(/mul\((\d+),(\d+)\)/g)
      .forEach((element) => {
        total += element[1] * element[2];
      });
  });

console.log(total);
