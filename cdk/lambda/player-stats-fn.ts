import { Context, SQSEvent } from "aws-lambda";


export const handler = async (
  event: SQSEvent,
  context: Context
) => {

  console.log(`Event: ${JSON.stringify(event)}`);

};
