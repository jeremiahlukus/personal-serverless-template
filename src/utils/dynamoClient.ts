import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

const docClient = new DynamoDB.DocumentClient();

export async function query(request: DocumentClient.QueryInput): Promise<DocumentClient.QueryOutput> {
  return docClient.query(request).promise();
}

export async function get(request: DocumentClient.GetItemInput): Promise<DocumentClient.GetItemOutput> {
  return docClient.get(request).promise();
}

export async function put(request: DocumentClient.PutItemInput): Promise<DocumentClient.PutItemOutput> {
  return docClient.put(request).promise();
}

export async function update(request: DocumentClient.UpdateItemInput): Promise<DocumentClient.PutItemOutput> {
  return docClient.update(request).promise();
}

export async function deleteRecord(request: DocumentClient.DeleteItemInput): Promise<DocumentClient.DeleteItemOutput> {
  return docClient.delete(request).promise();
}
