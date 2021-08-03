setPassword = async (val) => {
  global.password = val;
}

test('Properly test password reset function', () => {
  setPassword("passyPass")
  expect(global.password).toBe("passyPass")
})