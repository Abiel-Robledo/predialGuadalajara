/**
 * Format a number to a string with a given number of decimals.
 *
 * Time complexity: O(n) where n is the number of digits before the decimal point.
 * Space complexity: O(n) where n is the number of digits of the number.
 *
 * @param value The number to format.
 * @returns The formatted number.
 */
const numberFormat = (value: number | string): string => {
  try {
    const roundedNumber = parseFloat(value as string).toFixed(2);
    const tokens = roundedNumber.split('');

    let index = tokens.length - 4;
    let commaCount = 0;

    while (index > 0) {
      if (commaCount === 2) {
        // Insert comma
        tokens.splice(index, 0, ',');
        commaCount = 0;
        index -= 1;
      }

      index -= 1;
      commaCount += 1;
    }

    return `$ ${tokens.join('')}`;
  } catch {
    // Do nothing
  }

  return '$ 0.00';
};

export {
  numberFormat,
};
