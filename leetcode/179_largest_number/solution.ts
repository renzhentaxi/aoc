export function largestNumber(nums: number[]): string {
  nums.sort(compareNums);

  if (nums[0] === 0) {
    // if the array only contains zero, then joining them will create stuff like "00"
    // this makes sure that "00" will be converted to "0" since
    // if the leading digit is 0 then all other digits will have to be 0
    return "0";
  }
  return nums.join("");
}

function compareNums(a: number, b: number) {
  if (a === b) {
    return 0;
  }

  const aStr = a.toString();
  const bStr = b.toString();
  let i = 0;
  let j = 0;
  let c = 0;
  //  we need to terminate the loop after max * 2 to make sure we dont enter an infinite loop
  // assume a and b will not cause a loop, then
  //
  const max = (aStr.length > bStr.length ? aStr.length : bStr.length) * 2;
  while (c < max) {
    if (i === aStr.length) {
      i = 0;
    }
    if (j === bStr.length) {
      j = 0;
    }
    let aChar = aStr.charAt(i);
    let bChar = bStr.charAt(j);
    if (aChar > bChar) {
      return -1;
    }
    if (aChar < bChar) {
      return 1;
    }
    i++;
    j++;
    c++;
  }

  return 0;
}

export function concatSort(nums: number[]): string {
  nums.sort((a, b) => {
    const aStr = a.toString();
    const bStr = b.toString();
    return -(aStr + bStr).localeCompare(bStr + aStr);
  });

  if (nums[0] === 0) {
    return "0";
  }
  return nums.join("");
}
