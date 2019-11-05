import React from 'react';
import './post-card.styles.scss';

const PostCard = ({id,data:{ title, developedBy}}) => {
    return (
        <div className='post-card'>
            <h3>{id}</h3>
            <h1>
                {title}
            </h1>
            <h3>
                {developedBy}
            </h3>
        </div>
    )
}

export default PostCard;
