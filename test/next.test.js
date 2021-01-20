beforeEach(() => {
  jest.resetModules()
})

test('Check that right value is returned', () => {
  const m = require('../dist')

  expect(m._next()).toBe(m._CONTINUE)
})

test('Check that process does not continue without next', () => {
  const m = require('../dist')
  const req = { method: 'get' }
  const res = null

  let i = 0

  m
    .use(() => null)
    .get(() => i++)
    .end(() => expect(i).toBe(0))(req, res)
})

test('Check that process continues with next', () => {
  const m = require('../dist')
  const req = { method: 'get' }
  const res = null

  let i = 0

  m
    .use((req, res, next) => next())
    .get(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})

test('Check that process continues with deep next', () => {
  const m = require('../dist')
  const req = { method: 'get' }
  const res = null

  let i = 0

  m
    .use((req, res, next) => next())
    .get([
      (req, res, next) => {
        i++
        return next()
      },
      () => i++
    ])
    .end(() => expect(i).toBe(2))(req, res)
})
