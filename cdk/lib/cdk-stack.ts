import * as cdk from "aws-cdk-lib";
import {
  LambdaIntegration,
  LambdaRestApi,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

import {
  AssetCode,
  Code,
  Function,
  LayerVersion,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const matchFunction = new NodejsFunction(this, "Match", {
      entry: "lambda/match-fn.ts",
      runtime: Runtime.NODEJS_18_X,
    });



    const api = new RestApi(this, "reabold-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets.",
    });

    const matchModel = new apigateway.Model(this, "model-validator", {
      restApi: api,
      contentType: "application/json",
      description: "To validate the request body",
      modelName: "matchmodelcdk",
      schema: {
        type: JsonSchemaType.OBJECT,
        required: ["datetime","court","wins","losses"],
        properties: {
          datetime: { type: "date" },
          wins: { type: "number" },
          losses: { type: "number" },
          team1: {
            type: "object",
            required: ["player1","player2"],
            properties: {
              player1: { type: "string" },
              player2: { type: "string" },
            },
            team2: {
              type: "object",
              required: ["player1","player2"],
              properties: {
                player1: { type: "string" },
                player2: { type: "string" },
              },
          },
        },
      },
    }});

    api.root.addResource("matches")
    .addMethod(
      "POST",
      new LambdaIntegration(matchFunction, {
        requestValidator: new apigateway.RequestValidator(this,"body-validator",{restApi: api,requestValidatorName: "body-validator",validateRequestBody: true,}),
        requestModels: {"application/json": matchModel},
      })
    );
  }
}
