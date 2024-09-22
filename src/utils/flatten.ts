const flatten = (array: (string | null)[][]): (string | null)[] => {
  return array.reduce((acc, val) => acc.concat(val), []);
};

export default flatten;
