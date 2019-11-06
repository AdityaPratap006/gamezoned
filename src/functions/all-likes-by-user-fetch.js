/* Import faunaDB sdk */
const faunadb = require("faunadb");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context) => {
  const { id } = JSON.parse(event.body);

  console.log("Function `all-likes-by-user-fetch` invoked");
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_likes"))))
    .then(response => {
      const likeRefs = response.data;
      console.log("Like refs", likeRefs);
      
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllLikesDataQuery = likeRefs.map(ref => {
        return q.Get(ref);
      });
      // then query the refs
      return client.query(getAllLikesDataQuery).then(ret => {

        const result = ret.filter(likeObj => (likeObj.data.userId === id));
        console.log(`${result.length} likes by user id ${id} found`);
        return {
          statusCode: 200,
          body: JSON.stringify(result)
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
};
