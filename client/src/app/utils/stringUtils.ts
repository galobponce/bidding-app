export function cutString(str: string, limit: number) {
  if (str.length > limit) {
    return str.slice(0, limit - 3).concat('...');
  }
  return str;
}