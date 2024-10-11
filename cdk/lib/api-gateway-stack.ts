import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path = require("path");
import { AssetCode, Function, HttpMethod, Runtime } from "aws-cdk-lib/aws-lambda";
import { postMatchModel } from "./api-model";
import { STATUS_CODES } from "http";

export class ApiGatewayStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const matchFunction = new NodejsFunction(this, "match-fn", {
            functionName: "match-fn",
            entry: "lambda/match-fn.ts",
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

        const key = api.addApiKey("ApiKey", {
            apiKeyName: "ApiKey",
        });

        const usagePlan = api.addUsagePlan("UsagePlan", {
            name: "Usage Plan",
            throttle: {
                rateLimit: 100,
                burstLimit: 200,
            },
            quota: {
                limit: 1000,
                period: apigateway.Period.DAY,
            },
        });

        usagePlan.addApiKey(key);
        usagePlan.addApiStage({
            stage: api.deploymentStage,
        });

        const basicValidator = api.addRequestValidator("BasicValidator", {
            validateRequestBody: true,
        });

        const apiRoot = api.root.addResource("v1")
        const matchResource = apiRoot.addResource("match")

        matchResource.addMethod(HttpMethod.POST, new apigateway.LambdaIntegration(matchFunction, {}),
            {
                requestModels: { "application/json": postMatchModel(this, api) },
                requestValidator: basicValidator,
                apiKeyRequired: false,
            });

        matchResource.addMethod(HttpMethod.GET, new apigateway.LambdaIntegration(matchFunction, {}), { apiKeyRequired: false });

    }
}