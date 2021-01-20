beforeEach(() => {
  jest.resetModules()
})

test('Check that lowercase request method is supported', () => {
  const m = require('../dist')
  const req = { method: 'get' }
  const res = null

  let i = 0

  m
    .get(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})

test('Check that uppercase request method is supported', () => {
  const m = require('../dist')
  const req = { method: 'GET' }
  const res = null

  let i = 0

  m
    .get(() => i++)
    .end(() => expect(i).toBe(1))(req, res)
})
