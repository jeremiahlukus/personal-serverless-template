import StatusCode from 'status-code-enum';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { withBasicAuth } from '../utils/withBasicAuth';
import * as env from '../utils/environment';
import * as service from '../services/getById';
import { NoSlsObjectFoundError } from '../models/error';

const handleEventInternal: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return { statusCode: StatusCode.ClientErrorNotFound, body: '' };
  }

  console.log(`Getting by Id: ${event.pathParameters.id}`);

  try {
    const slsObject = await service.getById(env.tableName(), event.pathParameters.id);

    if (slsObject) {
      return { statusCode: StatusCode.SuccessOK, body: JSON.stringify(slsObject) };
    }
    return { statusCode: StatusCode.ClientErrorNotFound, body: '' };
  } catch (e) {
    if (e instanceof NoSlsObjectFoundError) {
      return { statusCode: StatusCode.ClientErrorNotFound, body: '' };
    }
    console.log(e);
    return { statusCode: StatusCode.ServerErrorInternal, body: e.message };
  }
};

export const handleEvent = withBasicAuth(env.basicAuthUsername(), env.basicAuthPassword(), handleEventInternal);
