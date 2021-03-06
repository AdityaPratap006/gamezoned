/* Import faunaDB sdk */
const faunadb = require("faunadb");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  console.log("Function `post-like` invoked", data);
  const like = {
    data: data
  };

  return client
    .query(q.Get(q.Ref(`classes/posts/${data.postId}`)))
    .then(res => {
      /* update likeCount in post */
      console.log(`Updating likeCount of post id: ${data.postId}`);

      return client
        .query(
          q.Update(q.Ref(`classes/posts/${data.postId}`), {
            data: {
              likeCount: res.data.likeCount + 1
            }
          })
        )
        .then(responsePost => {
          console.log("liked!", responsePost);

          return client
            .query(q.Create(q.Ref("classes/likes"), like))
            .then(responseLike => {
              console.log("success", responseLike);
              return {
                statusCode: 200,
                body: JSON.stringify(responsePost)//return the post data after like
              };
            })
            .catch(error => {
              console.log("error", error);
              /* Error! return the error with statusCode 400 */
              return {
                statusCode: 400,
                body: JSON.stringify(error)
              };
            });
        })
        .catch(error => {
          console.log("error", error);
          return {
            statusCode: 400,
            body: JSON.stringify(error)
          };
        });
      //updated likeCount and created like document inside likes collection in database
    })
    .catch(error => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
