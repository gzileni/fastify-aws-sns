'use strict'

const { SNSClient } = require("@aws-sdk/client-sns");
const client = new SNSClient({ region: process.env.AWS_DEFAULT_REGION })
module.exports = client
