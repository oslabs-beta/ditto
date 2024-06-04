import { FC } from 'react';
import '../styles/pages/FAQPage.css';
import '../styles/Global.css';

const FAQPage: FC = () => {
  return (
    <div className='faq-page'>
      <div className='faq-container'>
        <h1 className='faq-title'>Frequently Asked Questions</h1>
        <ul className='faq-list'>
          <li className='faq-item'>
            <p className='question'><strong><em>What was the inspiration behind Ditto?</em></strong><br /></p>
            <p className='answer'>
              As schema management teams grow, so do potential issues with consistencies. With Ditto, we aim to reduce instances of these conflicts to facilitate database schema migration.
            </p>
          </li>
          <li className='faq-item'>
            <p className='question'><strong><em>What lies ahead for Ditto?</em></strong><br /></p>
            <p className='answer'>
              We plan on implementing features that allow users to upload and manage their SQL scripts with an intuitive GUI that displays a list of available scripts with detailed information about each script. Users will be able to use this to perform actions such as executing and deleting scripts.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FAQPage;
