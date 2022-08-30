# fastify-aws-sns

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  ![CI workflow](https://github.com/gzileni/fastify-aws-sns/workflows/CI%20workflow/badge.svg)

Supports Fastify versions `4.x`

fastify-aws-sns is plugins to communicate with [Amazon Simple Notification Service (Amazon SNS)](http://aws.amazon.com/sns/), a web service that enables you to build distributed web-enabled applications. Applications can use Amazon SNS to easily push real-time notification messages to interested subscribers over multiple delivery protocols.

With AWS SNS publishers communicate asynchronously with subscribers by producing and sending a message to
a topic, which is a logical access point and communication channel. Subscribers (web servers, email addresses, Amazon SQS queues, AWS Lambda functions) consume or receive the message or notification over one of the supported protocols (Amazon SQS, HTTP/S, email, SMS, AWS Lambda) when they are subscribed to the topic.

## Install

```bash
npm i fastify-aws-sns
```

and setup [AWS environments](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html):

```bash
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
export AWS_DEFAULT_REGION=us-west-2
```

### Custom Environments

- *AWS_TOPIC_NAME*: AWS SNS Topic Name

```bash
export AWS_TOPIC_NAME=myTopic
```

## Usage

Require `fastify-aws-sns` and register.

```js

const fastify = require('fastify')()

fastify.register(require('fastify-aws-sns'))
fastify.listen({ port: 3000 })
```

## Topic

To create, list, and delete Amazon SNS topics, and to handle topic attributes

### Options Topics

Options|Method|Optional|Default value|Description
:---|:---|:---|:---|:---
*topic*|create|yes|process.env.AWS_TOPIC_NAME| 
*topicArn*|list, del, getAttributes, setAttributes|no| |
*attributeName*|setAttributes|no| |
*attributeValue*|setAttributes|no| |

### fastify.snsTopics.create(options)

To create an Amazon SNS topic and return topicArn

```js

fastify.snsTopics.create({
    topic: 'mySNSMessages'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsTopics.list(options)

to list all Amazon SNS topics

```js

fastify.snsTopics.list({
    topicArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsTopics.del(options)

to delete an Amazon SNS topic

```js

fastify.snsTopics.del({
    topicArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsTopics.getAttributes(options)

to retrieve attributes of an Amazon SNS topic

```js

fastify.snsTopics.getAttributes({
    topicArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsTopics.setAttributes(options)

to set the mutable attributes of an Amazon SNS topic

```js

fastify.snsTopics.setAttributes({
    topicArn: 'xxx:xxxx:xxxxxx',
    attributeName: 'xxxxxx',
    attributeValue: 'yyyyyy'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

## Message

Publish messages from Amazon SNS to topic endpoints, emails, or phone numbers

### Options Message

Options|Method|Optional|Default value|Description
:---|:---|:---|:---|:---
*topicArn*|publish|no| | 
*message*|publish|no| |

### fastify.snsMessage.publish(options)

to publish a message to an Amazon SNS topic

```js

fastify.snsMessage.publish({
    topicArn: 'xxx:xxxx:xxxxxx',
    message: 'my message'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

## SubScriptions

Publish notification messages to Amazon SNS topics.

### Options SubScriptions

Options|Method|Optional|Default value|Description
:---|:---|:---|:---|:---
*topicArn*|list, setByEMail, confirmSubscriptionByEMail, setByEndPoint, setByLambda|no| |
*topicSubscriptionArn*|unsubscribe|no| |
*email*|setByEMail|no| |
*token*|confirmSubscriptionByEMail|no| |
*endPointArn*|setByEndPoint|no| |
*lambdaArn*|setByLambda|no| |

### fastify.snsSubscriptions.list(options)

to list all subscriptions to an Amazon SNS topic

```js

fastify.snsSubscriptions.list({
    topicArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSubscriptions.setByEMail(options)

to subscribe an email address so that it receives SMTP email messages from an Amazon SNS topic

```js

fastify.snsSubscriptions.setByEMail({
    topicArn: 'xxx:xxxx:xxxxxx',
    email: 'giuseppe.zileni@gmail.com'
}).then(result => {
    // token to send confirmSubscriptionByEMail method
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

#### fastify.snsSubscriptions.confirmSubscriptionByEMail(options)

to verify an endpoint owner's intent to receive emails by validating the token sent to the endpoint by a previous subscribe action

```js

fastify.snsSubscriptions.confirmSubscriptionByEMail({
    token: 'xxx:xxxx:xxxxxx',
    topicArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSubscriptions.setByEndPoint(options)

to subscribe a mobile application endpoint so it receives notifications from an Amazon SNS topic

```js

fastify.snsSubscriptions.setByEndPoint({
    endPointArn: 'xxx:xxxx:xxxxxx',
    topicArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSubscriptions.setByLambda(options)

to subscribe an AWS Lambda function so it receives notifications from an Amazon SNS topic

```js

fastify.snsSubscriptions.setByLambda({
    lambdaArn: 'xxx:xxxx:xxxxxx',
    topicArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSubscriptions.unsubscribe(options)

to unsubscribe an Amazon SNS topic subscription.

```js

fastify.snsSubscriptions.unsubscribe({
    topicSubscriptionArn: 'xxx:xxxx:xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

## SMS

Send text messages, or SMS messages, to SMS-enabled devices

### Options SMS

Options|Method|Optional|Default value|Description
:---|:---|:---|:---|:---
*attributeName*|getAttributes|no| |Attribute name
*attributeType*|setAttributes|yes|'Promotional'|The type of SMS message that you will send by default
*phoneNumber*|isNumber, publish|no| | Phone Number in the E.164 phone number structure
*message*|publish|no| | Message to send

### fastify.snsSMS.getAttributes(options)

to get the current SMS attributes in Amazon SNS

```js

fastify.snsSMS.getAttributes({
    attributeName: 'xxxxxx'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSMS.setAttributes(options)

to set the current SMS attributes in Amazon SNS:

- **Promotional** – (Default) Noncritical messages, such as marketing messages. Amazon SNS optimizes the message delivery to incur the lowest cost.
- **Transactional** – Critical messages that support customer transactions, such as one-time passcodes for multi-factor authentication. Amazon SNS optimizes the message delivery to achieve the highest reliability.

```js

fastify.snsSMS.setAttributes({
    attributeType: 'Promotional'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSMS.isNumber(options)

to check a phone number to see if it has opted out from receiving SMS messages

```js

fastify.snsSMS.isNumber({
    phoneNumber: '353861230764'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSMS.listNumbers()

to get a list of phone numbers that have opted out from receiving SMS messages

```js

fastify.snsSMS.listNumbers().then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

### fastify.snsSMS.publish(options)

to send an SMS message to a phone number

```js

fastify.snsSMS.publish({
    message: 'my text message',
    phoneNumber: '353861230764'
}).then(result => {
    console.log(result)
}).catch(e => {
    console.error(e)
})

```

## Acknowledgements

## License

Licensed under [MIT](./LICENSE).<br/>
