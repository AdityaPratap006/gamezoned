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
  const {userId, postId} = JSON.parse(event.body)
  console.log('Function `post-unlike` invoked')
   
  /* construct the fauna query */
  return client
  .query(q.Get(q.Ref(`classes/posts/${postId}`)))
  .then(res => {
    /* update likeCount in post */
    console.log(`Updating likeCount of post id: ${postId}`);

    return client
      .query(
        q.Update(q.Ref(`classes/posts/${postId}`), {
          data: {
            likeCount:  res.data.likeCount > 0? res.data.likeCount - 1:  res.data.likeCount
          }
        })
      )
      .then(response => {
        console.log("unliked!", response);

        //deleting!
        return  client.query(q.Delete(q.Select("ref",q.Get(q.Match(q.Index('like_by_post_user'),[userId,postId])))))
        .then((res) => {
          console.log('HERE I AM!!!', res)
          console.log('Deleted!')
          /* Success! now  return the post with that postId*/
          return client.query(q.Get(q.Ref(`classes/posts/${postId}`)))
          .then((postData) => {
            console.log('success', postData)
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
        }).catch((error) => {
          console.log('error', error)
          /* Error! return the error with statusCode 400 */
          return {
            statusCode: 400,
            body: JSON.stringify(error)
          }
        })
    
        //deleted! 
      })
      .catch(error => {
        console.log("error", error);
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        };
      });
    //updated likeCount and delted like document inside likes collection in database
  })
  .catch(error => {
    console.log("error", error);
    /* Error! return the error with statusCode 400 */
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
 });

}