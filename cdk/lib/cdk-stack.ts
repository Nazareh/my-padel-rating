import * as cdk from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import {
  AssetCode,
  Code,
  Function,
  LayerVersion,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaLayer = new LayerVersion(this, "BackendLayer", {
      code: Code.fromAsset("../lambda/match-service/node_modules"),
      compatibleRuntimes: [
        Runtime.NODEJS_14_X,
      ],
    });

    const backendLambda = new Function(this, "BackendHandler", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("../lambda/match-service/dist"),
      handler: "index.handler",
      layers: [lambdaLayer],
      environment: {
        NODE_PATH: "$NODE_PATH:/opt",
      },
    });

    new LambdaRestApi(this, "BackendEndpoint", {
      handler: backendLambda,
    });
  }
}
