import React from 'react';
import './like-button.styles.scss';

import  like  from '../../assets/like.png';
import  unlike  from '../../assets/unlike.png';

const LikeButton = ({ liked }) => {
    return (
        <div className='like-button'>
            {
                liked
                    ? <img alt="liked" src={like} />
                    :<img alt="unliked" src={unlike}/>
            }
        </div>
    )
}

export default LikeButton;
