import * as React from 'react';
import '../styles/pages/FAQPage.css';

const FAQPage: React.FC = () => {
  return (
    <div className='FAQBox'>
      <div className='FAQ'>
        <div className='faqContainer'>
          <div className='faqTitle'>
            <h1>Frequently Asked Questions</h1>
            </div>
            <ul className='FAQul'>
              <li className='FAQli'>
                <p className='Q'><strong><em>What was the inspiration behind Ditto?</em></strong><br /></p>
                <p className='A'>
                  As schema management teams grow, so do potential issues with consistencies. With Ditto, we aim to reduce instances of these conflicts to facilitate database schema migration.
                  </p>
                  </li>
                  <li className='FAQli'>
                    <p className='Q'><strong><em>What lies ahead for Ditto?</em></strong><br /></p>
                    <p className='A'>
                      We plan on implementing features that allow users to upload and manage their SQL scripts with an intuitive GUI that displays a list of available scripts with detailed information about each script. Users will be able to use this to perform actions such as executing and deleting scripts.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
  );
};

export default FAQPage;
