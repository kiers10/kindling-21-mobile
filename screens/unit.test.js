import './global';

setEmail = async (val) => {
  global.email = val;
  return true;
}

test('Properly test setEmail function', () => {
  setEmail("email@email.com")
  expect(global.email).toBe("email@email.com")

})