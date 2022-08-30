'use strict'

const AWS = require('aws-sdk')
const snsClient = new AWS.SNSClient({ region: process.env.AWS_DEFAULT_REGION })
module.exports = snsClient
