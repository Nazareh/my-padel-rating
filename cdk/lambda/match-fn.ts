import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const db = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const match: Match = JSON.parse(event.body || '');
    match.id = uuidv4()

    try {
        await db.put({
            TableName: 'match',
            Item: match
        }).promise();
        return {
            statusCode: 201, body: JSON.stringify({
                match
            })
        };
    } catch (dbError) {
        return { statusCode: 500, body: JSON.stringify({ dbError }) };
    }
};
