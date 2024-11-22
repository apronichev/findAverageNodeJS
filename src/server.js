const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/calculate', (req, res) => {
  const numbers = req.body.numbers.split(',').map(Number);
  const average = findAverage(numbers);
  res.json({ average: average });
});

function findAverage(numbers) {
  const total = numbers.reduce((acc, num) => acc + num, 0);
  return total;
}

// Check for command-line arguments
const args = process.argv.slice(2);
if (args.length) {
  const numbers = args.map(Number);
  const average = findAverage(numbers);
  console.log(`Average of [${numbers}] is ${average}`);
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}