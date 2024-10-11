import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export const postMatchModel = (scope: Construct, api: apigateway.RestApi ): apigateway.Model => {
    return new apigateway.Model(scope, "model-validator", {
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
}


