import React from 'react';
import '/client/src/styles/UserBubble.css';
import userIcon from '/client/src/assets/img/blank-user.png'

const UserBubble: React.FC = () => {
  return (
    <div className="user-bubble">
      <button className='userBtn'>
        <img src={userIcon} alt="User Icon" />
        </button>
    </div>
  );
};

export default UserBubble;