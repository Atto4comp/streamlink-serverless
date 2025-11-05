#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StreamlinkStack } from '../lib/streamlink-stack';

const app = new cdk.App();
new StreamlinkStack(app, 'StreamlinkStack', {
  env: { region: 'eu-north-1' },
});

