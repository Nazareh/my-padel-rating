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

    api.root.addResource("matches").addMethod(
      "POST",
      new LambdaIntegration(matchFunction, {
        requestTemplates: { "application/json": '{ "statusCode": "201" }' },
      })
    );
  }
}
