beforeEach(() => {
  jest.resetModules()
})

test('Check that GET request method handler is called', () => {
  const m = require('../dist')
  const req = { method: 'get' }
  const res = null

  let i = 0

  m
    .get(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})

test('Check that POST request method handler is called', () => {
  const m = require('../dist')
  const req = { method: 'post' }
  const res = null

  let i = 0

  m
    .post(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})

test('Check that PATCH request method handler is called', () => {
  const m = require('../dist')
  const req = { method: 'patch' }
  const res = null

  let i = 0

  m
    .patch(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})

test('Check that PUT request method handler is called', () => {
  const m = require('../dist')
  const req = { method: 'put' }
  const res = null

  let i = 0

  m
    .put(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})

test('Check that DELETE request method handler is called', () => {
  const m = require('../dist')
  const req = { method: 'delete' }
  const res = null

  let i = 0

  m
    .delete(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})

test('Check that missing method throws an exception', () => {
  const m = require('../dist')
  const req = { method: 'post' }
  const res = null

  const t = () => m.get(() => null).end()(req, res)

  expect(t).toThrow()
})
