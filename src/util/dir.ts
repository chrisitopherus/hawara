/**
 * Function that determines in which direction an element is dragged.
 * @param prev Previous y position of the element.
 * @param next New y position of the element.
 * @returns A string describing the direction.
 */
export const dir = (prev: number, next: number) => prev - next > 0 ? 'up' : prev - next !== 0 ? 'down' : 'none';