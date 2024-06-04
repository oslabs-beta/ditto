import * as React from 'react';
import '../styles/Global.css';

const DocumentationPage: React.FC = () => {
  return(
    <div>
      <div className='text-container'>
        <p className='docTxt'>
          <strong>D.I.T.T.O</strong> (<em>Data Integration and Transfer Tool for Organizations</em>) is a desktop
          application for managing SQL migration scripts tailored for Postgres databases on AWS.
          This is made possibly by the meticulous implementation of:
          </p>
          <div className='list'>
            <ol>
              <li>Consistent database schema applications.</li>
              <li>Intuitive UI for accurate tracking and version control.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
