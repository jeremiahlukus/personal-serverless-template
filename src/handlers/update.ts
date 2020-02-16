import StatusCode from 'status-code-enum';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { withBasicAuth } from '../utils/withBasicAuth';
import * as getService from '../services/getById';
import * as service from '../services/update';
import { invalidJsonError, isParseable } from '../utils/formatValidations';
import { UpdateResponse } from '../models';
import { NoSlsObjectFoundError } from '../models/error';
import * as env from '../utils/environment';

export const handleEventInternal: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return { statusCode: StatusCode.ClientErrorNotFound, body: '' };
  }

  if (!event.body || !isParseable(event.body)) {
    return invalidJsonError;
  }

  const { id } = event.pathParameters;
  try {
    const slsObject = await getService.getById(env.tableName(), id);
    const result: UpdateResponse = await service.update(
      env.tableName(),
      slsObject.username,
      JSON.parse(event.body),
      slsObject.unitId,
    );

    if (result.validationErrors) {
      return {
        statusCode: StatusCode.ClientErrorUnprocessableEntity,
        body: JSON.stringify(result.validationErrors),
      };
    }
    return {
      statusCode: StatusCode.SuccessNoContent,
      body: '',
    };
  } catch (e) {
    if (e instanceof NoSlsObjectFoundError) {
      return { statusCode: StatusCode.ClientErrorNotFound, body: '' };
    }
    console.log(e);
    throw e;
  }
};

export const handleEvent = withBasicAuth(env.basicAuthUsername(), env.basicAuthPassword(), handleEventInternal);
