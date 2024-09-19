const generateGrid = <T>(rows: number, cols: number, mapper: () => T): T[][] =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, mapper));

export default generateGrid;
