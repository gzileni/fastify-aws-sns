import { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance {
    snsTopics: () => any
    snsMessages: () => any
    snsSubscriptions: () => any
    snsSMS: () => any
  }
}

declare const snsTopics: FastifyPluginCallback<() => any>
declare const snsMessages: FastifyPluginCallback<() => any>
declare const snsSubscriptions: FastifyPluginCallback<() => any>
declare const snsSMS: FastifyPluginCallback<() => any>

export { snsTopics, snsMessages, snsSubscriptions, snsSMS }
export default snsTopics
