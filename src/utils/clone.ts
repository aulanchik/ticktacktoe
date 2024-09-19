const clone = <T>(x: T) => JSON.parse(JSON.stringify(x));

export default clone;
