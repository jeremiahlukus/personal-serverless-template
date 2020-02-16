import { GetResponse } from '../models';
import { getSlsObjectById } from './getSlsObject';

export async function getById(tableName: string, id: string): Promise<GetResponse> {
  console.log('Getting saleReadyIndicator record by id', tableName, id);

  const slsObject = await getSlsObjectById(tableName, id);

  return slsObject;
}
