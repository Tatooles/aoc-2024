const input = await Deno.readTextFile("input.txt");

// Parse into 2D grid
const rows = input.split(/\r?\n/);
const n = rows.length;

let total = 0;

// Check horizontal
for (const row of rows) {
  // Need to check forwards and backwards
  const match = row.matchAll(/(?=(XMAS|SAMX))/g);
  total += [...match].length;
}

// Check vertical, just take the columns
for (let i = 0; i < n; i++) {
  //   console.log([...match].length, row);
  const column = rows.map((x) => x[i]).join("");
  const match = column.matchAll(/(?=(XMAS|SAMX))/g);
  total += [...match].length;
}

// Now have to check diagonals...
const diagonals = [];

// Going to handle long diagonal here so it'll be 2n diagonals added
// Top going down left and right
for (let a = 0; a < n; a++) {
  const diagonalRight = [];
  const diagonalLeft = [];

  // Now need to follow the whole diagonal needs to be a while loop
  let b = 0;
  let j = a;
  while (b < n && j < n) {
    diagonalRight.push(rows[b][j]);
    // Move down and right
    b++;
    j++;
  }

  let c = 0;
  let k = n - 1 - a;
  while (c < n && k >= 0) {
    diagonalLeft.push(rows[c][k]);
    // Move down and left
    c++;
    k--;
  }

  diagonals.push(diagonalRight.join(""));
  diagonals.push(diagonalLeft.join(""));
}

// Long diagonals already handled so we can start closer in
// Bottom going up left and right
for (let a = 1; a < n - 1; a++) {
  const diagonalRight = [];
  const diagonalLeft = [];

  // Now need to follow the whole diagonal needs to be a while loop
  let b = n - 1;
  let j = a;
  while (b < n && j < n) {
    diagonalRight.push(rows[b][j]);
    // Move up and right
    b--;
    j++;
  }

  let c = n - 1;
  let k = n - 1 - a;
  while (c < n && k >= 0) {
    diagonalLeft.push(rows[c][k]);
    // Move up and left
    c--;
    k--;
  }

  diagonals.push(diagonalRight.join(""));
  diagonals.push(diagonalLeft.join(""));
}

diagonals.forEach((diagonal) => {
  const match = diagonal.matchAll(/(?=(XMAS|SAMX))/g);
  total += [...match].length;
});

console.log(total);
