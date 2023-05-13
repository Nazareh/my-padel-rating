import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const match:Match = JSON.parse(event.body || '');

    return {
        statusCode: 201,
        body: JSON.stringify({
        match
        }),
    };
};
