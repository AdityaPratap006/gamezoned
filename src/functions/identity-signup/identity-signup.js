// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions

/* Import faunaDB sdk */
const faunadb = require('faunadb')

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async function(event, context) {
  const data = JSON.parse(event.body)
  const { user } = data

  const responseBody = {
    app_metadata: {
      roles: user.email.split('@')[1] === 'trust-this-company.com' ? ['editor'] : ['visitor'],
      my_user_info: 'this is some user info'
    },
    user_metadata: {
      ...user.user_metadata, // append current user metadata
      createdAt: user.created_at,
      email: user.email,
      id: user.id,
    }
  }

  const userData = {
    id: user.id,
    created_at: user.created_at,
    email: user.email,
    name: user.user_metadata.full_name
  }

  const newUser =  {
    data: userData
  }


  return  client.query(q.Create(q.Ref('classes/users'), newUser))
    .then((response) => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify({...responseBody, createdUser:response})
      }
    }).catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
