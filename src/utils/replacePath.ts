export function replacePath(
  path: string,
  replaces?: {
    [key: string]: string;
  }
) {
  if (!replaces) return path;

  return Object.keys(replaces).reduce((acc, key) => {
    return acc.replace(`[:${key}]`, replaces[key]);
  }, path);
}
