const axios = require('axios')

jest.mock('axios')

const foo = axios.post('https://kindling-lp.herokuapp.com/api/login', {email_str: 'josephxm825@gmail.com', password_str: 'valorant_fan'})

const data = {
  success_bool: true,
  email_str: "josephxm825@gmail.com",
  is_group_bool: true,
  ready_status_int: 3,
  access_token_str: "string_test"
}

describe('api call', () => {
  it('login', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(data))
  })
})