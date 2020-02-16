# Serverless API: Typescript and Jest Template
A Serverless API template using Typescript and Jest.

## Deployment - Dev

```
ENV=test sh bin/deploy.sh
```

## To remove:
```
sls remove --stage test
```

# API interactions
The API url can be found either the console output, or accessed via the `.serverless/output.json` object.

## GET: Healthcheck
Test the service is up

```
/healthcheck
```

# Testing
This template uses Jest (Typescript) to run its tests.

To test, first deploy the application
Then run
```
yarn test
```

This will use the generated API url to automatically test the application.
