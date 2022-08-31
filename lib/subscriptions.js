/** Managing Subscriptions in Amazon SNS */
/**
 * to publish notification messages to Amazon SNS topics.
 */

'use strict'

const { ListSubscriptionsByTopicCommand, SubscribeCommand,
        ConfirmSubscriptionCommand, UnsubscribeCommand } = require("@aws-sdk/client-sns");
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
    snsClient.send(new ListSubscriptionsByTopicCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * 
 * The protocol that you want to use. Supported protocols include:
 * 
  http – delivery of JSON-encoded message via HTTP POST
  https – delivery of JSON-encoded message via HTTPS POST
  email – delivery of message via SMTP
  email-json – delivery of JSON-encoded message via SMTP
  sms – delivery of message via SMS
  sqs – delivery of JSON-encoded message to an Amazon SQS queue
  application – delivery of JSON-encoded message to an EndpointArn for a mobile app and device
  lambda – delivery of JSON-encoded message to an Lambda function
  firehose – delivery of JSON-encoded message to an Amazon Kinesis Data Firehose delivery stream.
 */

const setByFireHose = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'sqs',
      TopicArn: options.topicArn,
      Endpoint: options.endPointArn,
      RoleArn: options.roleArn 
    }
    snsClient.send(new SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * 
 * @param {*} options 
 * @returns 
 */
const setBySMS = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'sqs',
      TopicArn: options.topicArn,
      Endpoint: options.phoneNumber 
    }
    snsClient.send(new SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * 
 * @param {*} options 
 * @returns 
 */
const setBySQS = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'sqs',
      TopicArn: options.topicArn,
      EndpointArn: options.endPointArn 
    }
    snsClient.send(new SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * 
 * @param {*} options 
 * @returns 
 */
const setByEMailJSON = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'email',
      TopicArn: options.topicArn,
      Endpoint: options.email
    }
    snsClient.send(new SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

  /**
   * 
   * @param {*} options 
   * @returns 
   */
const setByHttp = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'http',
      TopicArn: options.topicArn,
      Endpoint: options.endPoint
    }
    snsClient.send(new SubscribeCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * 
 * @param {*} options 
 * @returns 
 */
const setByHttps = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      Protocol: 'https',
      TopicArn: options.topicArn,
      Endpoint: options.endPoint 
    }
    snsClient.send(new SubscribeCommand(params)).then(data => {
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
    snsClient.send(new SubscribeCommand(params)).then(data => {
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

    snsClient.send(new ConfirmSubscriptionCommand(params)).then(data => {
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
      Endpoint: options.endPointArn 
    }
    snsClient.send(new SubscribeCommand(params)).then(data => {
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
    snsClient.send(new SubscribeCommand(params)).then(data => {
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
    snsClient.send(new UnsubscribeCommand(params)).then(data => {
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
  unsubscribe,
  setByHttp,
  setByHttps,
  setByFireHose,
  setByEMailJSON,
  setBySQS,
  setBySMS
}
