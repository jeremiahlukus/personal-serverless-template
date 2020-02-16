import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import * as auth from 'basic-auth';

export type ValidateBasicAuth = (userName: string, password: string, event: APIGatewayProxyEvent) => boolean;
export type WithBasicAuth = (
  userName: string,
  password: string,
  handler: APIGatewayProxyHandler,
) => APIGatewayProxyHandler;

const validateBasicAuth: ValidateBasicAuth = (userName, password, event) => {
  if (event && event.headers && event.headers.Authorization) {
    const authHeader = event.headers.Authorization;
    const user = auth.parse(authHeader);
    if (user) {
      return user.name === userName && user.pass === password;
    }
    return false;
  }
  return false;
};

export const withBasicAuth: WithBasicAuth = (userName, password, handler) => {
  return async (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: APIGatewayProxyCallback,
  ): Promise<APIGatewayProxyResult> => {
    if (validateBasicAuth(userName, password, event)) {
      return handler(event, context, callback) as Promise<APIGatewayProxyResult>;
    }
    return { statusCode: 401, body: '' };
  };
};
