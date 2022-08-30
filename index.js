'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('snsTopics', require('./lib/topics'))
  fastify.decorate('snsMessages', require('./lib/messages'))
  fastify.decorate('snsSubscriptions', require('./lib/subscriptions'))
  fastify.decorate('snsSMS', require('./lib/sms'))
}, { fastify: '^4.x' })
