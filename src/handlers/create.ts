import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import StatusCode from 'status-code-enum';
import { withBasicAuth } from '../utils/withBasicAuth';
import * as service from '../services/create';
import * as env from '../utils/environment';
import { invalidJsonError, isParseable } from '../utils/formatValidations';

const handleEventInternal: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  if (!event.body || !isParseable(event.body)) {
    return invalidJsonError;
  }

  const result = await service.create(env.tableName(), JSON.parse(event.body));
  if (result.validationErrors) {
    return {
      statusCode: StatusCode.ClientErrorUnprocessableEntity,
      body: JSON.stringify(result.validationErrors),
    };
  }
  if (result) {
    return {
      statusCode: StatusCode.SuccessCreated,
      body: '',
    };
  }
  throw new Error(`Unexpected result in create: ${result}`);
};

export const handleEvent = withBasicAuth(env.basicAuthUsername(), env.basicAuthPassword(), handleEventInternal);
