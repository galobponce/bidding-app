/**
 * Get new date as string in 'YYYY-MM-ddTHH:mm:ss' format
 * @returns date as string
 */
export function getNewDateString(): string {
  return new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
};