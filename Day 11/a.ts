const main = async () => {
  const input = await Deno.readTextFile("input.txt");

  const initial = input.split(" ").map((x) => +x);

  console.log(handleBlinks(initial, 25));
};

const handleBlinks = (initial: number[], blinks: number) => {
  let current = [...initial];
  for (let i = 0; i < blinks; i++) {
    current = [...handleBlink(current)];
    // console.log(current);
  }
  return current.length;
};

const handleBlink = (stones: number[]) => {
  const afterBlink = [];
  // Go through the think and check each case
  for (let i = 0; i < stones.length; i++) {
    // Need to check all rules on each stones
    const response = checkRules(stones[i]);
    if (typeof response !== "number") {
      afterBlink.push(response[0]);
      afterBlink.push(response[1]);
    } else {
      afterBlink.push(response);
    }
  }

  return afterBlink;
};

const checkRules = (value: number) => {
  const str = value.toString();
  if (value === 0) {
    return 1;
  } else if (str.length % 2 === 0) {
    const firstHalf = str.slice(0, str.length / 2);
    const secondHalf = str.slice(str.length / 2);
    return [+firstHalf, +secondHalf];
  } else {
    return value * 2024;
  }
};

console.time("execution time");
main();
console.timeEnd("execution time");
