#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StreamlinkStack } from '../lib/streamlink-stack';

const app = new cdk.App();
new StreamlinkStack(app, 'StreamlinkStack', {
  // region/account will come from the ENV in GitHub Actions
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
