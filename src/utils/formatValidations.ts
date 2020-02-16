import StatusCode from 'status-code-enum';

export function isParseable(json: string): boolean {
  if (!json) {
    return false;
  }

  try {
    JSON.parse(json);
    return true;
  } catch (err) {
    return false;
  }
}

export const invalidJsonError = {
  statusCode: StatusCode.ClientErrorBadRequest,
  body: JSON.stringify({
    errors: [
      {
        code: 'invalid.json',
        property: 'request.body',
        message: 'Invalid Json',
        developerMessage: 'Invalid Json',
      },
    ],
  }),
};
