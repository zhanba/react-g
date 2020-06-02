export const dedupeArrays = <T extends { length: number }>(arrays: Array<T>) => {
  const res: string[] = [];
  arrays.forEach(array => {
    [].forEach.call(array, item => {
      res.push(item);
    });
  });
  return Array.from(new Set(res));
};
