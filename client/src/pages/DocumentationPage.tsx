import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentationPage: React.FC = () => {
  return(
  <div><h1>Documentation</h1>
  <section>
    <p>
      <strong>DITTO</strong> (<em>Data Integration and Transfer Tool for Organizations</em>) is a desktop application for managing SQL migration scripts tailored for Postgres databases on AWS.
    Ditto does this by implementing consistent application of database schemas, accurate tracking with intuitive UI and version control.
    </p>
    </section>
    </div>
  )
}

export default DocumentationPage;