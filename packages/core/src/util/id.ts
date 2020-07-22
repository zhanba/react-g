let id = 0;

export const reset = () => {
  id = 0;
};

export const generateId = () => {
  const gen = `${id}`;
  id += 1;
  return gen;
};
