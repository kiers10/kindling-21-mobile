const axios = require('axios')

jest.mock('axios')

const foo = axios.post('https://kindling-lp.herokuapp.com/api/register', {email_str: 'josephxm825@gmail.com', password_str: 'valorant_fan', display_name_str: 'Joseph', phone_str:'123-456-7890', is_group_bool: false})

const data = {
  success_bool: true,
  email_str: "josephxm825@gmail.com",
  is_group_bool: true,
}

describe('api call', () => {
  it('login', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(data))
  })
})