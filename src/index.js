const http = require('http')

const isResponse = v => v instanceof http.ServerResponse

module.exports = function (req, res) {
  this._handlers = {}

  this._add = (key, fn) => {
    let tmp = this._handlers[key]

    if (!Array.isArray(tmp)) {
      tmp = this._handlers[key] = []
    }

    if (Array.isArray(fn)) {
      this._handlers[key] = [].concat(tmp, fn)

      return
    }

    this._handlers[key].push(fn)

    return this
  }

  this.use = fn => (
    this._add('*', fn)
  )

  this.get = fn => (
    this._add('get', fn)
  )

  this.post = fn => (
    this._add('post', fn)
  )

  this.patch = fn => (
    this._add('patch', fn)
  )

  this.put = fn => (
    this._add('put', fn)
  )

  this.delete = fn => (
    this._add('delete', fn)
  )

  this.end = async () => {
    const method = req.method.toLowerCase()

    // Check that handlers are set for method
    if (Array.isArray(this._handlers[method])) {
      const middleware = this._handlers['*']
      const handlers = [].concat(middleware, this._handlers[method])

      // Run through all handlers
      for (let i = 0; i < handlers.length; i++) {
        const out = await handlers[i](req, res)

        // Exit early if a response is returned
        if (isResponse(out)) {
          return
        }
      }

      return
    }

    const err = Error(`Missing handlers for '${method}' method`)

    err.method = method
    err.req = req
    err.res = res

    throw err
  }
}
