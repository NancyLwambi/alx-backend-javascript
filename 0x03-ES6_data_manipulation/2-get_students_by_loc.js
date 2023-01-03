export default function getStudentsByLocation(array, city) {
  return array.filter((i) => i.location === city);
}
