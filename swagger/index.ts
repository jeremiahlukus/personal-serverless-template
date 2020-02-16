/* eslint-disable */
import fs from 'fs';
import yaml from 'js-yaml';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { convert } from './convert';

let schemas = {};
try {
    schemas = require(`../src/schemas`);
} catch(e) {
    console.log(e)
}

const listOfSchemas: string[] = [];
const schemasFolder = `${__dirname}/schemas`;

if (!fs.existsSync(schemasFolder)) {
  fs.mkdirSync(schemasFolder);
}

try {
  const documentation = yaml.safeLoad(fs.readFileSync('./resources/documentation.yml', 'utf8'));

  if (!isEmpty(documentation) && documentation.models && !isEmpty(documentation.models)) {
    map(documentation.models, model => {
      listOfSchemas.push(model.name);
    });
  }
} catch (error) {
  throw new Error(error);
}

map(schemas, (schema, index) => {
  if (listOfSchemas.includes(index)) {
    const converted = convert(schema);
    fs.writeFile(`${__dirname}/schemas/${index}.json`, JSON.stringify(converted, null, 4), error => {
      if (error) {
        throw new Error(error.message);
      }
      console.log(`Schema was successfully converted and file ${index}.json created`);
    });
  }
});
