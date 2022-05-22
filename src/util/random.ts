/**
 * Function that generates a random integer within a specified range.
 * @param min Lowest int.
 * @param max Highest int.
 * @returns Integer.
 */
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;