"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamlinkStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const streamlink_serverless_1 = require("streamlink-serverless");
const apigwv2 = __importStar(require("aws-cdk-lib/aws-apigatewayv2"));
const integrations = __importStar(require("aws-cdk-lib/aws-apigatewayv2-integrations"));
class StreamlinkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const streamlink = new streamlink_serverless_1.Streamlink(this, 'StreamlinkBackend');
        const api = new apigwv2.HttpApi(this, 'StreamlinkApi', {
            description: 'Streamlink serverless endpoint',
            corsPreflight: {
                allowHeaders: ['*'],
                allowMethods: [apigwv2.CorsHttpMethod.GET],
                allowOrigins: ['*'],
            },
        });
        const integration = new integrations.HttpLambdaIntegration('StreamlinkIntegration', streamlink.function);
        api.addRoutes({
            path: '/live/{proxy+}', // e.g. /live/youtube.com/@NASA/best.m3u8
            methods: [apigwv2.HttpMethod.GET],
            integration,
        });
        new cdk.CfnOutput(this, 'ApiEndpoint', { value: api.apiEndpoint });
    }
}
exports.StreamlinkStack = StreamlinkStack;
//# sourceMappingURL=streamlink-stack.js.map