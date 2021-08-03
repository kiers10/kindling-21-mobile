const axios = require('axios')

jest.mock('axios')

const foo = axios.post('https://kindling-lp.herokuapp.com/api/send_verification_email', {email_str: 'josephxm825@gmail.com'})

const data = {
  success_bool: true
}

describe('api call', () => {
  it('sendEmailVerification', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(data))
  })
})