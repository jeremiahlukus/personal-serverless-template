import StatusCode from 'status-code-enum';

const handleEventInternal: any = async event => {
  try {
    // eslint-disable-next-line max-len
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://swagger.s3.amazonaws.com/SERVICE_NAME/STAGE_NAME/swagger.bundle.js"></script>
</body>
</html>`;
    return {
      statusCode: StatusCode.SuccessOK,
      body: htmlContent,
      headers: {
        'Content-Type': 'text/html',
      },
    };
  } catch (e) {
    console.warn(e.message);
    throw e;
  }
};

export const handleEvent = handleEventInternal;
