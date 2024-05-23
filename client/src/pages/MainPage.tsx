import * as React from 'react';
import Ditto from '/client/src/assets/img/Ditto.gif';
import Community from '../components/Community';
import '../styles/MainPage.css';
import DocumentationPage from './DocumentationPage';

const MainPage: React.FC = () => {
  return (
    <div>
      <h1>DITTO</h1>
      <div className="content-container">
        <img src={Ditto} alt="Dancing Ditto gif" />
        <DocumentationPage />
        <Community />
      </div>
    </div>
  );
}

export default MainPage;
