export default function iterateThroughObject(reportWithIterator) {
  let employees = '';
  for (const employee of reportWithIterator) {
    employees += `${employee} | `;
  }
  return employees.slice(0, -3);
}
