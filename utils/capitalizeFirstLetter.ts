export function capitalizeFirstLetter(val: string) {
  if (typeof val !== 'string') {
    return;
  }
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
}
