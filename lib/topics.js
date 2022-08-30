/**
 * Managing Topics in Amazon SNS
 *
 * to create, list, and delete Amazon SNS topics, and to handle topic attributes
 */

'use strict'

const AWS = require('aws-sdk')
const snsClient = require('./snsClient')

/**
 * Creating a Topic
 * @param {*} options
 *    topics
 * @returns
 */
const create = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Name: options.topic ? options.topic : process.env.AWS_TOPIC_NAME
    }
    snsClient.send(new AWS.CreateTopicCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Listing Your Topics
 * @returns
 */
const list = async () => {
  return new Promise((resolve, reject) => {
    snsClient.send(new AWS.ListTopicsCommand({})).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Deleting a Topic
 * @param {*} options
 *   topicArn
 * @returns
 */
const del = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      TopicArn: options.topicArn
    }
    snsClient.send(new AWS.DeleteTopicCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Getting Topic Attributes
 * @param {*} options
 *    topicArn
 * @returns
 */
const getAttributes = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      TopicArn: options.topicArn
    }
    snsClient.send(new AWS.GetTopicAttributesCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Setting Topic Attributes
 * @param {*} options
 *    attributeName
 *    attributeValue
 *    topicArn
 * @returns
 */
const setAttributes = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      AttributeName: options.attributeName, // ATTRIBUTE_NAME
      TopicArn: options.topicArn,
      AttributeValue: options.attributeValue // NEW_ATTRIBUTE_VALUE
    }

    snsClient.send(new AWS.SetTopicAttributesCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

module.exports = {
  create,
  list,
  del,
  getAttributes,
  setAttributes
}
