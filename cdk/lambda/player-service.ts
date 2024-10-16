import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb"
import { DynamoTables} from "../dynamo/tables"
import { Player } from "./model"
import { nanoid } from 'nanoid'


const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export async function upsertPlayer(email: string, name: string | undefined): Promise<Player> {
  let player: Player| undefined  = await findPlayerByEmail(email)

  if (!player) {

    player = {
      id: nanoid(),
      email,
      name, 
      matchesWon: 0,
      matchesLost: 0,
      gamesWon: 0,
      gamesLost: 0,
      ratings: new Map()
    }
    console.log(`New player will be created: ${JSON.stringify(player)}`)

  } else {
    if (name) {
      console.log(`Updating name=${name} for player=${player.id}`)
      player.name = name
    }
  }

  await dynamo.send(new PutCommand({
    TableName: DynamoTables.PLAYER,
    Item: player
  }))

  return player
}


export async function findPlayerById(id: string): Promise<Player> {
  return (await dynamo.send(
     new GetCommand({
       TableName: DynamoTables.PLAYER,
       Key: {
         id,
       },
     }))).Item as Player
 }

 export async function findPlayerByEmail(email: string): Promise<Player | undefined> {
  const players = (await dynamo.send(
    new ScanCommand({
      TableName: DynamoTables.PLAYER,
      ExpressionAttributeValues: { ":email": email},
      FilterExpression: "email = :email"
    })
  )).Items as Player[];
  
  console.log(`Players found: ${JSON.stringify(players)}`);
  
  if (!players || players.length === 0) {
    return undefined;
  }

  if (players.length > 1) {
    throw new Error("Multiple players found for the same email");
  }

  return players[0];
}