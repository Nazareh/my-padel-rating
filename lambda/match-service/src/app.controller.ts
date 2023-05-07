import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hi Get';
  }
  @Post('/matches')
  postHello(event: APIGatewayEvent): APIGatewayProxyResult {
    console.log(`reveiced request: ${event}`);
    return {
      statusCode: 200,
      body: JSON.stringify(event),
    };
  }
}
