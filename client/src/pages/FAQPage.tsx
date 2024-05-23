import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQPage: React.FC = () => {
  return(
    <div>
      <h1>Frequently Asked Questions (Questions will be added as they grow more frequent)</h1>
      <section>
        <ul>
        <li><strong><em>What was the inspiration behind Ditto?</em></strong></li>
          As schema management teams grow, so do potential issues with consistencies. With Ditto, we aim to reduce instances of these conflicts to facilitate database schema migration.
        <li><strong><em>What lies ahead for Ditto?</em></strong></li>
        We plan on implementing features that allow users to upload and manage their SQL scripts with intuitive GUI that displays a list of available scripts with detailed information about each script. Users will be able to use this to perform actions execute as well as delete scripts.
        </ul>
      </section>
    </div>
  );
};

export default FAQPage;