import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { HttpMethod } from "aws-cdk-lib/aws-lambda";

import { postMatchModel } from "./api-model";

import { DynamoTables } from "../dynamo/tables";
import { createLambda, createTable } from "./utils";
import { AttributeType, ProjectionType } from "aws-cdk-lib/aws-dynamodb";

export class ApiGatewayStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const matchTable = createTable(this, DynamoTables.MATCH);
        matchTable.addGlobalSecondaryIndex({
            indexName: 'PlayerIdIndex',
            partitionKey: { name: 'player_id', type: AttributeType.STRING },
            
            projectionType: ProjectionType.ALL
          });

        const matchFunction = createLambda(this, "match-fn",{})
        matchTable.grantReadWriteData(matchFunction)

        const playerTable = createTable(this, DynamoTables.PLAYER);
        // const playerFunction = createLambda(this, "player-fn", {})
        // playerTable.grantReadWriteData(playerFunction)
        
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
        {   requestModels: { "application/json": postMatchModel(this, api) },
            requestValidator: basicValidator,
            apiKeyRequired: false,
        });
        matchResource.addMethod(HttpMethod.GET, new apigateway.LambdaIntegration(matchFunction, {}), { apiKeyRequired: false })

        const matchIdResource = matchResource.addResource("{matchId}")
        matchIdResource.addMethod(HttpMethod.GET, new apigateway.LambdaIntegration(matchFunction, {}), { apiKeyRequired: false })

        // const playerResource = apiRoot.addResource("player")
        // apiRoot.addResource("player").addMethod(HttpMethod.GET, new apigateway.LambdaIntegration(playerFunction, {}), { apiKeyRequired: false })
        
        // const playerIdResource = playerResource.addResource("{id}")
        // playerIdResource.addMethod(HttpMethod.GET, new apigateway.LambdaIntegration(playerFunction, {}), { apiKeyRequired: false })

    }
}