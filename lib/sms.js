/** Sending SMS Messages with Amazon SNS */
/**
 * You can use Amazon SNS to send text messages, or SMS messages, to SMS-enabled devices.
 * You can send a message directly to a phone number, or you can send a message to multiple
 * phone numbers at once by subscribing those phone numbers to a topic and sending your message to the topic.
 */

'use strict'

const { GetSMSAttributesCommand, SetSMSAttributesCommand, 
        CheckIfPhoneNumberIsOptedOutCommand, ListPhoneNumbersOptedOutCommand,
        PublishCommand } = require("@aws-sdk/client-sns");
const snsClient = require('./snsClient')

/**
 * Getting SMS Attributes
 * @param {*} options
 *    attributeName
 * @returns
 */
const getAttributes = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      attributes: [
        'DefaultSMSType',
        options.attributeName
      ]
    }
    snsClient.send(new GetSMSAttributesCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Setting SMS Attributes
 * @param {*} options
 *   attributeType: "Transactional" (highest reliability), 'Promotional' (lowest cost) Default value
 * @returns
 */
const setAttributes = async (options) => {
  return new Promise((resolve, reject) => {
    const params = {
      attributes: {
        /* required */
        DefaultSMSType: options.attributeType ? options.attributeType : 'Promotional'
      }
    }
    snsClient.send(new SetSMSAttributesCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * Checking If a Phone Number Has Opted Out
 * @param {*} options
 *   phoneNumber: in the E.164 phone number structure. For example { phoneNumber: "353861230764" }
 * @returns
 */
const isNumber = async (options) => {
  return new Promise((resolve, reject) => {
    const params = { phoneNumber: options.phoneNumber }
    snsClient.send(
      new CheckIfPhoneNumberIsOptedOutCommand(params)
    ).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * 
 * @returns 
 */
const listNumbers = async () => {
  return new Promise((resolve, reject) => {
    snsClient.send(new ListPhoneNumbersOptedOutCommand({})).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

/**
 * 
 * @returns 
 */
const publish = async (options) => {
  return new Promise((resolve, reject) => {

    const params = {
      Message: options.message /* required */,
      PhoneNumber: options.phoneNumber, //PHONE_NUMBER, in the E.164 phone number structure
    };

    snsClient.send(new PublishCommand(params)).then(data => {
      resolve(data)
    }).catch(e => {
      reject(e.stack)
    })
  })
}

module.exports = {
  getAttributes,
  setAttributes,
  isNumber,
  listNumbers,
  publish
}
