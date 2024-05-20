import * as React from 'react';
import Ditto from '/client/src/assets/img/Ditto.gif';

const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Ditto</h1>
      <img src={Ditto}
      alt="Dancing Ditto gif"/>
    </div>
  );
}

export default MainPage;
