export default function appendToEachArrayValue(array, appendString) {
  const a = [];
  for (const value of array) {
    a.push(appendString + value);
  }

  return a;
}
