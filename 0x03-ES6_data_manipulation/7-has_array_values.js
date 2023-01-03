export default function hasValuesFromArray(set, array) {
  return array.every((i) => set.has(i));
}
