import fs from 'fs';

const file = process.argv[2];

fs.readFile(`${__dirname}/${file}`, (err, obj) => {
  if (err) {
    console.log(err);
    throw new Error(err.message);
  } else {
    const result = JSON.parse(obj.toString(), (key, value) => {
      return key !== 'options' ? value : undefined;
    });
    fs.writeFile(`${__dirname}/${file}`, JSON.stringify(result), error => {
      if (error) {
        throw new Error(error.message);
      }
    });
    console.log(`${file} was rebuilt successfully.`);
  }
});
