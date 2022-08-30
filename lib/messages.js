/**
 * Publishing Messages in Amazon SNS
 *
 * How to publish messages to an Amazon SNStopic
 */

'use strict'

const AWS = require('aws-sdk')
const snsClient = require('./snsClient')

/**
 * Publishing a Message to an SNS Topic
 * @param {*} options
 *    message
 *    topicArn
 * @returns
 */
const publish = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Message: options.message,
      TopicArn: options.topicArn
    }
    snsClient.send(new AWS.PublishCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

module.exports = {
  publish
}
