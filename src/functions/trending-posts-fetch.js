/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context) => {
  console.log('Function `trending-posts-fetch` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/post_sort_by_likeCount_desc'))))
    .then((response) => {
      const postRefs = response.data 
      console.log('Post refs', postRefs)
      console.log(`${postRefs.length} posts found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllPostsDataQuery = postRefs.map((ref) => {
         
        return q.Get(ref[1])
      })
      // then query the refs
      return client.query(getAllPostsDataQuery).then((ret) => {
        console.log('Holaaaaaaaaaaaaaa!', ret)
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
