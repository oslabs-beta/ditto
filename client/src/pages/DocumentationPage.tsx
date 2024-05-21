import * as React from 'react';
import '/client/src/styles/DocumentationPage.css';

const DocumentationPage: React.FC = () => {
  return(
    <div>
      <h1>Documentation</h1>
      <div className='docTxt'>
        <div className='text-container'>
          <p className='scrolling-text'>
            <strong>DITTO</strong> (<em>Data Integration and Transfer Tool for Organizations</em>) is a desktop
            application for managing SQL migration scripts tailored for Postgres databases on AWS.
            This is achieved through meticulous implementation of:
            <ol>
              <li>Consistent database schema applications.</li>
              <li>Intuitive UI for accurate tracking and version control.</li>
            </ol>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
