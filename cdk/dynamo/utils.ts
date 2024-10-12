import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {  
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoTables } from "./tables";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);



export async function putItemToDynamo(table: DynamoTables, item: any) {
  await dynamoDB
    .put({
      TableName: table,
      Item: item,
    })
    .promise();
}

export async function getItemsFromDynamo(table: DynamoTables): Promise<any> {
    await dynamoDB.batchGet(
        
    )

  }