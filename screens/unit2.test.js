setFirst = async (val) => {
  global.firstName = val;
}

test('Properly test setFirst function', () => {
  setFirst('George')
  expect(global.firstName).toBe('George')
})