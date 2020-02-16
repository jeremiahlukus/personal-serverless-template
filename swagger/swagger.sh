#!/usr/bin/env bash
# sls deploy
stage=$(ruby -rjson -e 'j = JSON.parse(File.read(".serverless/output.json")); puts j["Stage"]')
region=$(ruby -rjson -e 'j = JSON.parse(File.read(".serverless/output.json")); puts j["Region"]')
restApi=$(ruby -rjson -e 'j = JSON.parse(File.read(".serverless/output.json")); puts j["ApiUrl"]')
service=$(ruby -rjson -e 'j = JSON.parse(File.read(".serverless/output.json")); puts j["ServiceName"]')
fileType=json
outputFileName=$service-doc-$stage.$fileType
restApiId=$(ruby -rjson -e 'j = JSON.parse(File.read(".serverless/output.json")); puts URI.parse(j["ApiUrl"]).host.split(".").first')

if [ ! -n "$restApiId" ];
then
  echo "Rest API ID could not be found"
  exit
fi

if [ ! -n "$stage" ];
then
  echo "Stage could not be found"
  exit
fi

printf "Downloading Swagger definition to $outputFileName
  API ID: $restApiId
  Stage: $stage
  Accept: $fileType\n\n"

# serverless openapi generate
if [ "$stage" = 'prod' ]
then
  awssume aws apigateway get-export \
    --rest-api-id=$restApiId \
    --stage-name=$stage \
    --export-type=swagger \
    --accept=application/$fileType \
    --region=$region \
    "./swagger/$outputFileName"
else
  aws apigateway get-export \
    --rest-api-id=$restApiId \
    --stage-name=$stage \
    --export-type=swagger \
    --accept=application/$fileType \
    --region=$region \
    "./swagger/$outputFileName"
fi

if [ ! -f  "./swagger/$outputFileName" ];
then
  echo "$outputFileName could not be found"
  exit
else
  printf "Successfully downloaded $outputFileName\n\n"
fi

{
  bash -c "ts-node --project tsconfig.json swagger/rebuildJSON.ts $outputFileName" && echo "Rebuilt Complete"
} || { bash -c "ts-node swagger/rebuildJSON.ts $outputFileName" && echo "Backup Rebuild Complete"
}
bash -c  "yarn webpack --config swagger.webpack.config --env.FILE_NAME=$outputFileName"


if [ ! -f "./swagger/swagger.bundle.js" ];
then
  echo "swagger.bundle.js could not be found"
  exit
fi

#moving swagger bundle to s3 bucket
aws s3 mv "./swagger/swagger.bundle.js" s3://swagger/$service/$stage/swagger.bundle.js --acl public-read

#create the function in yml
if [ ! -f "src/handlers/$service-$stage.ts" ];
then
  echo "New function adding to function.yml"
  cat ./sampleFunction.yml >> resources/functions.yml
  sed -i "s|TEST|$service-$stage|g" resources/functions.yml
fi

# create the function file
cp sampleSwagger.ts  src/handlers/$service-$stage.ts
sed -i "s|SERVICE_NAME|$service|g" src/handlers/$service-$stage.ts
sed -i "s|STAGE_NAME|$stage|g" src/handlers/$service-$stage.ts


SCHEMA="./swagger/schemas"
if [ -d "$SCHEMA" ]; then
    printf '%s\n' "Removing ($SCHEMA)"
    rm -rf "$SCHEMA"
fi

BUNDLE="./swagger/$outputFileName"
if [ -r $BUNDLE ]; then
    printf '%s\n' "Removing ($BUNDLE)"
    rm -rf "$BUNDLE"
fi
