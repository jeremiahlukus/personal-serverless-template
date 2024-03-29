import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as dynamo from '../utils/dynamoClient';
import { NoSlsObjectFoundError } from '../models/error';
import { SlsObject } from '../models';

export async function getSlsObjectById(tableName: string, id: string): Promise<SlsObject> {
  console.log('Getting user record by id', tableName, id);

  const request: DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: 'idIndex',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
    Limit: 1,
  };
  const response = await dynamo.query(request);

  if (response == null || response.Count == null || response.Count === 0 || !response.Items) {
    throw new NoSlsObjectFoundError(`No user Found with Id: ${id}`);
  }
  const user = response.Items[0] as SlsObject;
  if (user == null) {
    throw new NoSlsObjectFoundError(`No user Found with Id: ${id}`);
  }
  return user;
}
