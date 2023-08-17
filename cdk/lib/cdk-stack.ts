import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as ses from "aws-cdk-lib/aws-ses";
import * as iam from "aws-cdk-lib/aws-iam";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const matchFunction = new NodejsFunction(this, "Match", {
      entry: "lambda/match-fn.ts",
      runtime: lambda.Runtime.NODEJS_18_X,
    });

    const api = new apigateway.RestApi(this, "reabold-api", {
      restApiName: "Reabold Api",
      description: "This API receives Padel match results",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS // this is also the default
      }
    });

  

    const matchModel = new apigateway.Model(this, "model-validator", {
      restApi: api,
      contentType: "application/json",
      description: "To validate the request body",
      modelName: "matchmodelcdk",
      schema: {
        type: apigateway.JsonSchemaType.OBJECT,
        required: ["datetime", "court", "wins", "losses", "team1", "team2"],
        properties: {
          court: { type: apigateway.JsonSchemaType.INTEGER },
          datetime: { type: apigateway.JsonSchemaType.STRING },
          wins: { type: apigateway.JsonSchemaType.INTEGER },
          losses: { type: apigateway.JsonSchemaType.INTEGER },
          team1: {
            type: apigateway.JsonSchemaType.OBJECT,
            required: ["player1", "player2"],
            properties: {
              player1: { type: apigateway.JsonSchemaType.STRING },
              player2: { type: apigateway.JsonSchemaType.STRING },
            },
          },
          team2: {
            type: apigateway.JsonSchemaType.OBJECT,
            required: ["player1", "player2"],
            properties: {
              player1: { type: apigateway.JsonSchemaType.STRING },
              player2: { type: apigateway.JsonSchemaType.STRING },
            },
          },
        },
      },
    });

    const basicValidator = api.addRequestValidator("BasicValidator", {
      validateRequestBody: true,
    });

   const apiMethod =  api.root
      .addResource("matches")
      .addMethod("POST", new apigateway.LambdaIntegration(matchFunction, {}), {
        requestModels: { "application/json": matchModel },
        requestValidator: basicValidator,
        apiKeyRequired: true
      });

      const usagePlan = api.addUsagePlan('UsagePlan', {
        name: 'Usage Plan',
        throttle: {
          rateLimit: 1,
          burstLimit: 1
        }
      });

      const key = api.addApiKey('ApiKey', {
        apiKeyName: 'myApiKey1',
        value: process.env.REABOLD_PADEL_API_GATEWAY_KEY
      });

      
      usagePlan.addApiKey(key);

      usagePlan.addApiStage({
        stage: api.deploymentStage,
        throttle: [
          {
            method: apiMethod,
            throttle: {
              rateLimit: 1,
              burstLimit: 1
            }
          }
        ]
      });

    const matchTable = new dynamodb.Table(this, "MatchTable", {
      tableName: "match",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    matchTable.grantReadWriteData(matchFunction);

    const senderEmail = "nazarehturmina@gmail.com";
    const receiverEmail = "nazarehturmina@yahoo.com.br";

    new ses.CfnEmailIdentity(this, "NazGmailIdentity", {
      emailIdentity: senderEmail,
    });

    new ses.CfnEmailIdentity(this, "NazYahooIdentity", {
      emailIdentity: receiverEmail,
    });

    const sesPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["ses:SendEmail", "ses:SendRawEmail"],
      resources: [
        `arn:aws:ses:${cdk.Stack.of(this).region}:${
          cdk.Stack.of(this).account
        }:identity/${senderEmail}`,
        `arn:aws:ses:${cdk.Stack.of(this).region}:${
          cdk.Stack.of(this).account
        }:identity/${receiverEmail}`,
      ],
      conditions: {
        StringEquals: {
          "ses:FromAddress": senderEmail,
        },
      },
    });

    matchFunction.addToRolePolicy(sesPolicy);
  }
}
