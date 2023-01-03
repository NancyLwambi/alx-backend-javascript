export default function getListStudentIds(array) {
  return array.reduce((accumulator, i) => accumulator + i.id, 0);
}
