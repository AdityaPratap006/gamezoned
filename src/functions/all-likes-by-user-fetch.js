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

        const filteredLikes = ret.filter(likeObj => likeObj.data.userId === id)

        const  getPostsData = filteredLikes.map(likeObj => {
           
          return q.Get(q.Ref(`classes/posts/${likeObj.data.postId}`));
        })
        
        return client.query(getPostsData)
               .then(data =>{ 
                 
                console.log(data)
                // const result = data.filter(post => (post.data.postedByUserId === id))
                // console.log('post-data',result) 
                //  console.log('returned: ',result);
                 //console.log(`${result.length} likes by user id ${id} found`);
                 return {
                   statusCode: 200,
                   body: JSON.stringify(data)
                 };
                })

        
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
