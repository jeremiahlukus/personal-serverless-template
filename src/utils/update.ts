import _ from 'lodash';

const flattenObject = (object: any): any => {
  return Object.keys(object).reduce((accumulator: any, currentKey) => {
    if (Object.prototype.toString.call(object[currentKey]) === '[object Date]') {
      accumulator[currentKey] = object[currentKey].toString();
    } else if (typeof object[currentKey] === 'object' && object[currentKey]) {
      const flatObject = flattenObject(object[currentKey]);
      Object.keys(flatObject).forEach(innerKey => {
        accumulator[`${currentKey}.${innerKey}`] = flatObject[innerKey];
      });
    } else {
      accumulator[currentKey] = object[currentKey];
    }
    return accumulator;
  }, {});
};

const dynamoExpression: any = flatObject =>
  _.transform(flatObject, (res: any, val: any, key: string) => {
    if (!res.UpdateExpression) {
      res.UpdateExpression = 'SET ';
    }
    let UpdateExpression = `#${key} = :${key}, `;
    let ExpressionAttributeNames = { [`#${key}`]: key };
    const ExpressionAttributeValues = { [`:${key}`]: val };

    if (key.includes('.')) {
      const flatKey = key.substring(0, key.indexOf('.'));
      UpdateExpression = `#${flatKey} = :${flatKey}, `;
      ExpressionAttributeNames = { [`#${flatKey}`]: flatKey };
      if (res.UpdateExpression.includes(UpdateExpression)) {
        UpdateExpression = ``;
      }
    }
    res.UpdateExpression += UpdateExpression;
    res.ExpressionAttributeNames = { ...res.ExpressionAttributeNames, ...ExpressionAttributeNames };
    res.ExpressionAttributeValues = { ...res.ExpressionAttributeValues, ...ExpressionAttributeValues };
    return res;
  });

export const getDynamoExpression = object => {
  const flatObject = flattenObject(object);
  const expression = dynamoExpression(flatObject);
  const UpdateExpression = expression.UpdateExpression.slice(0, -2);
  return { ...expression, UpdateExpression };
};
