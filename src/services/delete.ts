import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { SlsObject } from '../models';
import { NoSlsObjectFoundError } from '../models/error';
import * as dynamo from '../utils/dynamoClient';
import { getSlsObjectById } from './getSlsObject';

export async function deleteById(tableName: string, id: string): Promise<boolean> {
  console.log('Deleting saleReadyIndicators by id', tableName, id);

  try {
    const slsObject: SlsObject = await getSlsObjectById(tableName, id);
    const deleteRequest: DocumentClient.DeleteItemInput = {
      TableName: tableName,
      Key: { Id: slsObject.id },
    };
    await dynamo.deleteRecord(deleteRequest);

    return true;
  } catch (e) {
    if (e instanceof NoSlsObjectFoundError) {
      return false;
    }
    console.log(e);
    throw e;
  }
}
