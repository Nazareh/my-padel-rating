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
