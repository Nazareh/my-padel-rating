import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as ses from "@aws-sdk/client-ses";
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const db = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const match: Match = JSON.parse(event.body || '');
    match.id = uuidv4()

    try {
        await db.put({
            TableName: 'match',
            Item: match
        }).promise();

        const input = { 
            Source: "nazarehturmina@gmail.com",
            Destination: { 
                ToAddresses: [
                     "nazarehturmina@yahoo.com.br",
                ],
            },
            Message: {
                Body: {
                  Html: {
                    Charset: "UTF-8",
                    Data: `
                    <h3> Players: ${match.team1.player1}/${match.team1.player2} VS ${match.team2.player1}/${match.team2.player2} </h3>
                    <br>
                    Date: ${match.datetime} <br>
                    Court: ${match.court} <br>
                    Result: ${match.wins}:${match.losses}
                    `
                  },
                },
                Subject: {
                  Charset: "UTF-8",
                  Data: `New match: ${match.team1.player1}/${match.team1.player2} VS ${match.team2.player1}/${match.team2.player2}`,
                },
              },
        };
        

        const command = new ses.SendEmailCommand(input);
        const response = await new SESClient({region: 'ap-southeast-2'}).send(command);
        return {
            statusCode: 201, 
            headers: {
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                match,
                response
            })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error }) };
    }
};
