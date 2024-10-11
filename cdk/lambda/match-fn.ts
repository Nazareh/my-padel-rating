import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import {processMatch} from './match-service'
import { HttpMethod } from 'aws-cdk-lib/aws-lambda';
import { sampleMatches } from './sample-matches';
import { MatchDto, PostMatchDto } from './model';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    try{
        let bodyResponse:any = null; 
        const { httpMethod, body } = event;

        if (httpMethod == HttpMethod.POST) {
            const parsedBody = JSON.parse(body || '{}');
            const postMatchDto: PostMatchDto = {
                ...parsedBody, 
                startTime: new Date(parsedBody.startTime) 
            };
            bodyResponse = processMatch(postMatchDto)
        }

        if (httpMethod == HttpMethod.GET) {
            const sampleMatch:MatchDto = sampleMatches[Math.floor(Math.random() * (sampleMatches.length-1))]
            bodyResponse = sampleMatch
        }


        return {
            statusCode: 200, 
            
            body: JSON.stringify(bodyResponse)
        };

    } catch (error) {
       console.error("Error processing the request:", error);
       return{
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid request data" })
        };
    }
};
