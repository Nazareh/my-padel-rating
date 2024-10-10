import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
        return {
            statusCode: 201, 
            headers: {
                'Access-Control-Allow-Origin':'*'
            },
            body: "SUCCESS"
        };

};
