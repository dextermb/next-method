module.exports = {
  _CONTINUE: '__NM_CONTINUE',
  _handlers: {},
  _add: function (key, fn) {
    let tmp = this._handlers[key]

    if (!Array.isArray(tmp)) {
      tmp = this._handlers[key] = []
    }

    if (Array.isArray(fn)) {
      this._handlers[key] = [].concat(tmp, fn)
    } else {
      this._handlers[key].push(fn)
    }

    return this
  },
  _next: function () {
    return this._CONTINUE
  },
  use: function (fn) {
    return this._add('*', fn)
  },
  get: function (fn) {
    return this._add('get', fn)
  },
  post: function (fn) {
    return this._add('post', fn)
  },
  patch: function (fn) {
    return this._add('patch', fn)
  },
  put: function (fn) {
    return this._add('put', fn)
  },
  delete: function (fn) {
    return this._add('delete', fn)
  },
  end: function (fn) {
    return (req, res) => {
      const method = req.method.toLowerCase()

      // Check that handlers are set for method
      if (Array.isArray(this._handlers[method])) {
        const middleware = this._handlers['*']
        const handlers = [].concat(middleware, this._handlers[method])
        const next = this._next.bind(this)

        // Run through all handlers
        for (let i = 0; i < handlers.length; i++) {
          const handler = handlers[i]

          if (typeof handler === 'function') {
            if (handler(req, res, next) !== this._CONTINUE) {
              break
            }
          }
        }

        if (typeof fn === 'function') {
          fn()
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
}
