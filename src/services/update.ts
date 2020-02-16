import * as dynamo from '../utils/dynamoClient';
import { formatValidationErrors } from '../utils/formatValidationErrors';
import { UpdateRequest, UpdateResponse } from '../models';
import { UpdateRequestSchema } from '../schemas';

export async function update(
  tableName: string,
  id: string,
  request: UpdateRequest,
  unitId: string,
): Promise<UpdateResponse> {
  console.log('Updating sls object', tableName, id, request, unitId);
  const valid = UpdateRequestSchema.validate(request, { abortEarly: false });
  if (valid.error) {
    return { validationErrors: formatValidationErrors(valid.error) };
  }

  let updateExpression = 'SET ';
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  const updateObject = {
    ...request,
    updatedOn: new Date().toISOString(),
  };

  Object.keys(updateObject).forEach(key => {
    const value = updateObject[key];
    if (typeof value === 'object') {
      Object.keys(value).forEach(innerKey => {
        updateExpression += `#${key}.#${innerKey} = :${key}${innerKey}, `;
        expressionAttributeNames[`#${innerKey}`] = innerKey;
        expressionAttributeValues[`:${key}${innerKey}`] = value[innerKey];
        expressionAttributeNames[`#${key}`] = key;
      });
    } else {
      updateExpression += `#${key} = :${key}, `;
      expressionAttributeValues[`:${key}`] = value;
      expressionAttributeNames[`#${key}`] = key;
    }
  });
  updateExpression = updateExpression.slice(0, -2);

  expressionAttributeValues[':unitId'] = unitId;

  const dbRequest = {
    TableName: tableName,
    Key: {
      unitId,
    },
    IndexName: 'idIndex',
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    UpdateExpression: updateExpression,
    ConditionExpression: 'unitId = :unitId',
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    await dynamo.update(dbRequest);
  } catch (err) {
    console.log(err);
    console.log(dbRequest);
    throw err;
  }
  return {};
}
