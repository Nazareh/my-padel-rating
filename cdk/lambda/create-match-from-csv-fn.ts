import { S3Event } from "aws-lambda";
import * as AWS from "aws-sdk";
import { findPlayerByEmail, upsertPlayer } from "./player-service";
import { processMatch } from "./match-service";

const csv = require("csv-parser");
const s3 = new AWS.S3();

export const handler = async (event: S3Event): Promise<any> => {
  try {
    const objectKey = event.Records[0].s3.object.key;

    const itemsFromCsv: any[] = await parseCSVFile(
      event.Records[0].s3.bucket.name,
      objectKey
    );

    let playerIds: Map<String, String | undefined> = new Map();

    console.log(`Matches to be processed: ${itemsFromCsv.length}`);
    
    for (const csvItem of itemsFromCsv) {
      const { startTime, team1Player1, team1Player2, team2Player1, team2Player2, ...otherCsvProps } = csvItem;

      console.log(`Saving match ${JSON.stringify(csvItem)}`, );

      for (const playerEmail of [team1Player1, team1Player2, team2Player1, team2Player2]) {

        console.log(`playerEmail ${JSON.stringify(playerEmail)}`, playerEmail);
        
        if (!playerIds.has(playerEmail)) {

          console.log(`User not found in cache: ${playerIds}`);

          const player = await findPlayerByEmail(playerEmail);
       
          console.log(`User in dabatase: ${player}`);


          if (player) {
            playerIds.set(player.email, player.id);
          } else {
            console.log(`User not found, creating new player for email: ${playerEmail}`);
            const newPlayer = await upsertPlayer(playerEmail, undefined);
            playerIds.set(newPlayer.email, newPlayer.id);
          }
        }
      }

      await processMatch({
        startTime: new Date(startTime),
        team1Player1: playerIds.get(team1Player1),
        team1Player2: playerIds.get(team1Player2),
        team2Player1: playerIds.get(team2Player1),
        team2Player2: playerIds.get(team2Player2),
        ...otherCsvProps,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: "Error processing CSV:",
    };
  }

  return {
    statusCode: 200,
    body: "CSV processing completed",
  };
};


async function parseCSVFile(bucketName: string, key: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const objectsList: any[] = [];

    const stream = s3
      .getObject({ Bucket: bucketName, Key: key })
      .createReadStream();

    stream
      .pipe(csv())
      .on("data", (data: any) => {
        objectsList.push(data);
      })
      .on("end", () => {
        resolve(objectsList);
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
}
