import { v4 as uuid } from 'uuid';
import { CreateRequest, CreateResponse } from '../models';
import { CreateRequestSchema } from '../schemas';
import * as dynamo from '../utils/dynamoClient';
import { formatValidationErrors } from '../utils/formatValidationErrors';

export async function create(tableName: string, request: CreateRequest): Promise<CreateResponse> {
  const valid = CreateRequestSchema.validate(request, { abortEarly: false });
  if (valid.error) {
    return { validationErrors: formatValidationErrors(valid.error) };
  }
  const id = uuid();
  const unitId = request.unit.href;
  const creationDate = new Date(Date.now()).toISOString();
  const vehicle = {
    createdOn: creationDate,
    id,
    unitId,
    updatedOn: creationDate,
    username: request.username,
    email: request.email,
  };

  const dbRequest = {
    TableName: tableName,
    Item: vehicle,
  };
  try {
    await dynamo.put(dbRequest);
  } catch (err) {
    console.log(`Uncaught Dynamo Error: ${err}`);
    throw err;
  }

  return {};
}
