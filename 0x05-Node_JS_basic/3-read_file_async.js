const fs = require('fs');

async function countStudents(filepath) {
  try {
    const csv = await fs.promises.readFile(filepath, { encoding: 'utf8' });
    const headerArray = csv.split(/\r?\n|\n/);
    const headers = headerArray[0].split(',');

    // strip headers and convert to list of dicts
    const dictList = [];
    const noHeaderArray = headerArray.slice(1);
    for (let i = 0; i < noHeaderArray.length; i += 1) {
      const data = noHeaderArray[i].split(',');
      if (data.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j += 1) {
          row[headers[j].trim()] = data[j].trim();
        }
        dictList.push(row);
      }
    }

    // count and collect first names of students per field
    let countCS = 0;
    let countSWE = 0;
    const studentsCS = [];
    const studentsSWE = [];

    dictList.forEach((element) => {
      if (element.field === 'CS') {
        countCS += 1;
        studentsCS.push(element.firstname);
      } else if (element.field === 'SWE') {
        countSWE += 1;
        studentsSWE.push(element.firstname);
      }
    });

    const countStudents = countCS + countSWE;

    // print statements
    console.log(`Number of students: ${countStudents}`);
    console.log(`Number of students in CS: ${countCS}. List: ${studentsCS.toString().split(',').join(', ')}`);
    console.log(`Number of students in SWE: ${countSWE}. List: ${studentsSWE.toString().split(',').join(', ')}`);
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
