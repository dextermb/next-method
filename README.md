# 🕵🏻‍♂️ Next Method

`next-method`'s goal is to make it easier to interact with [Next][next]'s [API routes][next-api] by providing a wrapper around the [request method][request-method]. A simplistic, focused, and minimal interface.

## Contents

* [Installation](#installation)
* [Usage](#usage)
  * [Middleware](#middleware)
  * [Methods](#methods)
  * [Catching missing methods](#catching-missing-methods)


## Installation

Install using either NPM, Yarn, or a package manager of your choosing.

```bash
npm i next-method
# or
yarn add next-method
```

## Usage

`next-method` is designed to be used within [Next][next]'s [API routes][next-api]. After creating yourself an API endpoint you can then start working with it.

```js
const m = require('next-method')

module.exports = (
  m.get((req, res) => {
    res.send('Hello, world!')
  })
)
```

In this minimal example we're accepting `GET` requests to our endpoint. Once the endpoint is hit we either send the expected `GET` response or we throw an exception.

### Middleware

Adding middleware to any method is simple by making use of the `use` function, or the fact that methods can contain multiple handlers.

```js
const m = require('next-method')

module.exports = (
  m
    .use((req, res, next) => {
      // Check for user authentication
      if (user === null) {
        return res.status(401).end()
      }

      return next()
    })
    .post((req, res) => {

      // Create object
      storeObject()

      res.status(201)
    })
    .get((req, res) => {

      // Get object details
      const details = {}

      res.json(details)
    })
)

// or

module.exports = (
  m
    .post([
      (req, res, next) => {
        // Verify post data
        if (data === 'bad') {
          return res.status(422).json({ errors: 'Bad data provided' })
        }

        return next()
      },
      (req, res) => {

        // Create object
        storeObject()

        res.status(201)
      }
    ])
    .get((req, res) => {

      // Get object details
      const details = {}

      res.json(details)
    })
)
```

_In the examples above we make use of the `next` function that is provided as the third argument. This tells `next-method` to process the next handler._

### Methods

`next-method` supports all HTTP methods that the user is expected to come across such as:

* `get`
* `post`
* `patch`
* `put`
* `delete`

Each of these methods accept multiple handlers so can be processed in stages.

### Catching missing methods

When a request has been made and the method is not defined, such as in the example below: `put`, an exception will be thrown.

There are many ways to catch and handle the exception, but we provide a custom error object that provides the: request, response, and method.

```js
const m = require('next-method')

const authenticated = require('~/middleware/authenticated')
const action = require('~/actions/user')

module.exports = (
  m
    .use(authenticated)
    .post(action.create)
    .patch(action.update)
    .delete(action.remove)
    .get(action.retrieve)
    .catch(({ res, method }) => {
      res.status(422).json({ error: `${method} is not supported` })
    })
)
```

[next]: https://nextjs.org
[next-api]: https://nextjs.org/docs/api-routes/introduction
[request-method]: https://nodejs.org/api/http.html#http_request_method
