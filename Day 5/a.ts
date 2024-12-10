const input = await Deno.readTextFile("input.txt");

const parsed = input.split(/\n\n/);

// Probably need to make this a map
const rules = parsed[0].split(/\n/).map((x) => x.split("|"));

// create map for rules
const map = new Map();
for (const rule of rules) {
  if (map.has(rule[1])) {
    map.get(rule[1]).push(rule[0]);
  } else {
    map.set(rule[1], [rule[0]]);
  }
}
// console.log(map);

const updates = parsed[1].split(/\n/).map((x) => x.split(","));

// console.log(updates);

const checkRules = (list: string[]): boolean => {
  let valid = true;
  for (const num of list) {
    if (map.has(num)) { // There are rules about this page
      // These pages must be before num if they are in the list
      const before = map.get(num);
      for (const element of before) {
        if (
          list.includes(element) &&
          list.indexOf(element) > list.indexOf(num)
        ) {
          valid = false;
        }
      }
    }
  }
  // console.log(list, "is valid:", valid);
  return valid;
};

let total = 0;

// We need to crawl through each update and determine if it adheres to all the rules
for (const update of updates) {
  if (checkRules(update)) {
    // Find middle element
    total += parseInt(update[(update.length - 1) / 2]);
  }
}

console.log(total);
