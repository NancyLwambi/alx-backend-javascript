const express = require('express');
const fs = require('fs');

function countStudents(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', (err, res) => {
      if (err) return reject(new Error('Cannot load the database'));

      const headerArray = res.split(/\r?\n|\n/);
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

      return resolve({
        countStudents,
        countCS,
        countSWE,
        studentsCS,
        studentsSWE,
      });
    });
  });
}

const pathToDB = process.argv[2];
const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  // call async function and collect needed variables
  await countStudents(pathToDB)
    .then(({
      countStudents,
      countCS,
      countSWE,
      studentsCS,
      studentsSWE,
    }) => {
      const text = 'This is the list of our students\n';
      const total = `Number of students: ${countStudents}\n`;
      const CS = `Number of students in CS: ${countCS}. List: ${studentsCS.toString().split(',').join(', ')}\n`;
      const SWE = `Number of students in SWE: ${countSWE}. List: ${studentsSWE.toString().split(',').join(', ')}`;
      res.status(200).send(text + total + CS + SWE);
    })
    .catch(() => {
      res.status(404).send('Cannot load the database');
    });
});

app.listen(port);

module.exports = app;
