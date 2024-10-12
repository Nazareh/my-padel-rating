import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Table, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { RemovalPolicy } from "aws-cdk-lib";

export const createLambda = (construct: Construct, functionName: string, otherProps: any) =>
    new NodejsFunction(construct, functionName, {
        entry: `lambda/${functionName}.ts`,
        runtime: Runtime.NODEJS_18_X,
        functionName: functionName,
        logRetention: RetentionDays.ONE_DAY,
        ...otherProps,
    });

export const createTable = (construct: Construct, tableName: string) => {
    return new Table(construct, tableName, {
        tableName: tableName,
        partitionKey: { name: "id", type: AttributeType.STRING },
        removalPolicy: RemovalPolicy.DESTROY,
    });
};