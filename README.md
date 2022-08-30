# fastify-aws-sns

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  ![CI workflow](https://github.com/gzileni/fastify-aws-sns/workflows/CI%20workflow/badge.svg)

Supports Fastify versions `4.x`

## Install

```bash
npm i fastify-aws-sns
```

## Usage

Require `fastify-aws-sns` and register.

```js

const fastify = require('fastify')()

fastify.register(require('fastify-aws-sns'))
fastify.listen({ port: 3000 })
```

## Acknowledgements

## License

Licensed under [MIT](./LICENSE).<br/>
