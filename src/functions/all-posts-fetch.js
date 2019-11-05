/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context) => {
  console.log('Function `all-posts-fetch` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_posts'))))
    .then((response) => {
      const userRefs = response.data 
      console.log('Todo refs', userRefs)
      console.log(`${userRefs.length} todos found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllUsersDataQuery = userRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllUsersDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
