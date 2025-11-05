import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Streamlink } from 'streamlink-serverless';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';

export class StreamlinkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const streamlink = new Streamlink(this, 'StreamlinkBackend');

    const api = new apigwv2.HttpApi(this, 'StreamlinkApi', {
      description: 'Streamlink serverless endpoint',
      corsPreflight: {
        allowHeaders: ['*'],
        allowMethods: [apigwv2.CorsHttpMethod.GET],
        allowOrigins: ['*'],
      },
    });

    const integration = new integrations.HttpLambdaIntegration(
      'StreamlinkIntegration',
      streamlink.function
    );

    api.addRoutes({
      path: '/live/{proxy+}', // e.g. /live/youtube.com/@NASA/best.m3u8
      methods: [apigwv2.HttpMethod.GET],
      integration,
    });

    new cdk.CfnOutput(this, 'ApiEndpoint', { value: api.apiEndpoint });
  }
}

