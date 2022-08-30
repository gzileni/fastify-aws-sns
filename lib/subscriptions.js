/** Managing Subscriptions in Amazon SNS */
/**
 * to publish notification messages to Amazon SNS topics.
 */

'use strict'

const AWS = require('aws-sdk')
const snsClient = require('./snsClient')

/**
 * Listing Subscriptions to a Topic
 * @param {*} options
 *    topicArn
 * @returns
 */
const list = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      TopicArn: options.topicArn
    }
    snsClient.send(new AWS.ListSubscriptionsByTopicCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Subscribing an Email Address to a Topic
 * @param {*} options
 *    topicArn
 *    email
 * @returns
 */
const setByEMail = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'email',
      TopicArn: options.topicArn,
      Endpoint: options.email
    }
    snsClient.send(new AWS.SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Confirming Subscriptions
 * verify an endpoint owner's intent to receive emails by validating
 * the token sent to the endpoint by a previous subscribe action.
 * @param {*} options
 *    token
 *    topicArn
 * @returns
 */
const confirmSubscriptionByEMail = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Token: options.token, // Required. Token sent to the endpoint by an earlier Subscribe action.
      TopicArn: options.topicArn, // Required
      AuthenticateOnUnsubscribe: 'true' // 'true' or 'false'
    }

    snsClient.send(new AWS.ConfirmSubscriptionCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Subscribing an Application Endpoint to a Topic
 * @param {*} options
 *    topicArn
 *    endPointArn
 * @returns
 */
const setByEndPoint = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'application',
      TopicArn: options.topicArn,
      Endpoint: options.endPointArn // MOBILE_ENDPOINT_ARN
    }
    snsClient.send(new AWS.SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Subscribing a Lambda Function to a Topic
 * @param {*} options
 *   topicArn
 *   lambdaArn
 * @returns
 */
const setByLambda = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'lambda',
      TopicArn: options.topicArn,
      Endpoint: options.lambdaArn // LAMBDA_FUNCTION_ARN
    }
    snsClient.send(new AWS.SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Unsubscribing from a Topic
 * @param {*} options
 *    topicSubscriptionArn
 * @returns
 */
const unsubscribe = async (options) => {
  return new Promise((resolve, reject) => {
    const params = { SubscriptionArn: options.topicSubscriptionArn }
    snsClient.send(new AWS.UnsubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

module.exports = {
  list,
  setByEMail,
  confirmSubscriptionByEMail,
  setByEndPoint,
  setByLambda,
  unsubscribe
}
