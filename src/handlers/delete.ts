import StatusCode from 'status-code-enum';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { withBasicAuth } from '../utils/withBasicAuth';
import * as service from '../services/delete';
import * as env from '../utils/environment';

const handleEventInternal: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return { statusCode: StatusCode.ClientErrorNotFound, body: '' };
  }

  const deleted = await service.deleteById(env.tableName(), event.pathParameters.id);

  return {
    statusCode: deleted ? StatusCode.SuccessNoContent : StatusCode.ClientErrorNotFound,
    body: '',
  };
};

export const handleEvent = withBasicAuth(env.basicAuthUsername(), env.basicAuthPassword(), handleEventInternal);
