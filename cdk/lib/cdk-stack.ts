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

    const matchFunction = new NodejsFunction(this, 'Match', {
      entry: 'lambda/match-fn.ts',
      runtime: Runtime.NODEJS_18_X
    });

    new LambdaRestApi(this, "reabold-api", {
      handler: matchFunction,
    });
  }
}
