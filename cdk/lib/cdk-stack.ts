import * as cdk from "aws-cdk-lib";
import {
  JsonSchemaType,
  LambdaIntegration,
  Model,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

import {
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy, CfnOutput } from 'aws-cdk-lib';


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const matchFunction = new NodejsFunction(this, "Match", {
      entry: "lambda/match-fn.ts",
      runtime: Runtime.NODEJS_18_X
    });

    const api = new RestApi(this, "reabold-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets.",
    });

    const matchModel = new Model(this, "model-validator", {
      restApi: api,
      contentType: "application/json",
      description: "To validate the request body",
      modelName: "matchmodelcdk",
      schema: {
        type: JsonSchemaType.OBJECT,
        required: ["datetime", "court", "wins", "losses"],
        properties: {
          datetime: { type: JsonSchemaType.STRING },
          wins: { type: JsonSchemaType.INTEGER },
          losses: { type: JsonSchemaType.INTEGER },
          team1: {
            type: JsonSchemaType.OBJECT,
            required: ["player1", "player2"],
            properties: {
              player1: { type: JsonSchemaType.STRING },
              player2: { type: JsonSchemaType.STRING },
            },
          },
          team2: {
            type: JsonSchemaType.OBJECT,
            required: ["player1", "player2"],
            properties: {
              player1: { type: JsonSchemaType.STRING },
              player2: { type: JsonSchemaType.STRING },
            },
          },
        },
      },
    });


    const basicValidator = api.addRequestValidator('BasicValidator', {
      validateRequestBody: true
    })

    api.root.addResource("matches").addMethod(
      "POST",
      new LambdaIntegration(matchFunction, {}),
      {
        requestModels: { 'application/json': matchModel },
        requestValidator: basicValidator,
      }
    );

    const matchTable = new dynamodb.Table(this, 'MatchTable', {
      tableName: 'match',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    matchTable.grantReadWriteData(matchFunction)
  }
}
