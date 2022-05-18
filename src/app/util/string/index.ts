/**
 * Check string falsey or only contains whitespace or is empty
 * @param str
 * @returns boolean
 */
export function isBlank(str: any): boolean {
  return !str || /^\s*$/.test(str);
}
