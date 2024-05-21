import React from 'react';
import '/client/src/styles/UserBubble.css';
import userIcon from '/client/src/assets/img/blank-user.png'

const UserBubble: React.FC = () => {
  return(
    <div className='user'>
      <button className='userBtn'>
        <img src={userIcon} alt="icon" />
      </button>
    </div>
  )
}

export default UserBubble;