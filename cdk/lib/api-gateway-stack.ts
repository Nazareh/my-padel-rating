import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class ApiGatewayStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const postMatchFunction = new NodejsFunction(this, "PostMatch", {
            entry: "lambda/post-match-fn.ts",
            runtime: lambda.Runtime.NODEJS_18_X,
        });

        const api = new apigateway.RestApi(this, "my-padel-rating-api", {
            restApiName: "My Padel Rating Api",
            description: "This API receives Padel match results",
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS
            },
        });
        const basicValidator = api.addRequestValidator("BasicValidator", {
            validateRequestBody: true,
        });

        const postMatchModel = new apigateway.Model(this, "model-validator", {
            restApi: api,
            contentType: "application/json",
            description: "Validate PostMatch request body",
            modelName: "postMatch",
            schema: {
                type: apigateway.JsonSchemaType.OBJECT,
                required: ["startTime", "team1Player1", "team1Player2", "team2Player1", "team2Player2", "set1Team1Score", "set1Team2Score", "set2Team1Score", "set2Team2Score", "set3Team1Score", "set3Team2Score"],
                properties: {
                    startTime: { type: apigateway.JsonSchemaType.STRING },
                    team1Player1: { type: apigateway.JsonSchemaType.STRING },
                    team1Player2: { type: apigateway.JsonSchemaType.STRING },
                    team2Player1: { type: apigateway.JsonSchemaType.STRING },
                    team2Player2: { type: apigateway.JsonSchemaType.STRING },
                    set1Team1Score: { type: apigateway.JsonSchemaType.INTEGER },
                    set1Team2Score: { type: apigateway.JsonSchemaType.INTEGER },
                    set2Team1Score: { type: apigateway.JsonSchemaType.INTEGER },
                    set2Team2Score: { type: apigateway.JsonSchemaType.INTEGER },
                    set3Team1Score: { type: apigateway.JsonSchemaType.INTEGER },
                    set3Team2Score: { type: apigateway.JsonSchemaType.INTEGER },

                },
            },
        });

        const apiRoot = api.root.addResource("v1")

        const matchPath = apiRoot.addResource("match").addMethod("POST", new apigateway.LambdaIntegration(postMatchFunction, {}),
            {
                //   requestModels: { "application/json": postMatchModel },
                //   requestValidator: basicValidator,
                apiKeyRequired: false
            });

    }
}