import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const matchFunction = new NodejsFunction(this, "Match", {
      entry: "lambda/match-fn.ts",
      runtime: lambda.Runtime.NODEJS_18_X
    });

    const api = new apigateway.RestApi(this, "reabold-api", {
      restApiName: "Reabold Api",
      description: "This API receives Padel match results",
    });

    const matchModel = new apigateway.Model(this, "model-validator", {
      restApi: api,
      contentType: "application/json",
      description: "To validate the request body",
      modelName: "matchmodelcdk",
      schema: {
        type: apigateway.JsonSchemaType.OBJECT,
        required: ["datetime", "court", "wins", "losses","team1","team2"],
        properties: {
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


    const basicValidator = api.addRequestValidator('BasicValidator', {
      validateRequestBody: true
    })

    api.root.addResource("matches").addMethod(
      "POST",
      new apigateway.LambdaIntegration(matchFunction, {}),
      {
        requestModels: { 'application/json': matchModel },
        requestValidator: basicValidator,
      }
    );

    const matchTable = new dynamodb.Table(this, 'MatchTable', {
      tableName: 'match',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    matchTable.grantReadWriteData(matchFunction)

    const senderEmail = 'nazarehturmina@gmail.com';

    const senderIdentity = new ses.CfnEmailIdentity(this, 'NazGmailIdentity', {
      emailIdentity: senderEmail
    });

    const receiverIdentity = new ses.CfnEmailIdentity(this, 'NazYahooIdentity', {
      emailIdentity: 'nazarehturmina@yahoo.com.br'
    });

    const sesPolicy = 
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'ses:SendEmail',
            'ses:SendRawEmail',
            'ses:SendTemplatedEmail',
          ],
          resources: [
            `arn:aws:ses:${process.env.CDK_DEPLOY_REGION}:${
              cdk.Stack.of(this).account
            }:identity/${senderEmail}`,
          ],
          conditions: {
            'StringEquals': {
              'ses:FromAddress': senderEmail,
            },
          },
        })

    matchFunction.addToRolePolicy(sesPolicy)
  }
}
