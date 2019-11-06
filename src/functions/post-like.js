/* Import faunaDB sdk */
const faunadb = require('faunadb')

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log('Function `post-like` invoked', data)
  const like = {
    data: data
  }
  
  /* construct the fauna query */
  return client.query(q.Create(q.Ref('classes/likes'), like))
    .then((response) => {
      console.log('success', response)

      /* update likeCount in post */
      console.log(`Function 'todo-update' invoked. update id: ${data.postId}`)
      return client.query(q.Update(q.Ref(`classes/posts/${data.postId}`), {
          data : { 
              likeCount:  q.Var('likeCount')+1
            }
        }))
        .then((response) => {
          console.log('liked!', response)
          return {
            statusCode: 200,
            body: JSON.stringify(response)
          }
        }).catch((error) => {
          console.log('error', error)
          return {
            statusCode: 400,
            body: JSON.stringify(error)
          }
        })
        //end of upadting likeCount

    }).catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}