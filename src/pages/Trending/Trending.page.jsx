import React, { useState, useEffect } from 'react';
import './Trending.styles.scss';


import PostsContainer from '../../components/posts-container/posts-container.component';

const TrendingPage = () => {

    const [trendingPosts, setTrendingPosts] = useState([])

    const getTrendingPosts = async () => {

        return fetch('/.netlify/functions/trending-posts-fetch',{
            method:"POST"
        })
        .then(res => res.json())
    }
    
    useEffect(()=>{

        getTrendingPosts()
        .then(posts => {
            console.log('Fetched Trending Posts!');
            setTrendingPosts(posts);
        })
        .catch(err => console.log(err))

    },[setTrendingPosts])

     
    return (
        <div className='trending-page'>
            {
                trendingPosts.length
                ?<PostsContainer  postList={trendingPosts} />
                :<h3>Loading...</h3>
            } 
        </div>
    )
}


export default TrendingPage;
