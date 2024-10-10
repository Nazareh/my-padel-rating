#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayStack } from '../lib/api-gateway-stack';

const app = new cdk.App();
const prodEnv = { account: '672119549038', region: 'ap-southeast-2' }

new ApiGatewayStack(app, 'api-gateway-prod', {env: prodEnv});