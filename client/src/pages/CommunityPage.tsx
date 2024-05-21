import * as React from 'react';
import { Link } from 'react-router-dom';
import Jea from '/client/src/assets/img/teamPNG/Jea.png';
import Jay from '/client/src/assets/img/teamPNG/Jay.png';
import Jeff from '/client/src/assets/img/teamPNG/Jeff.png';
import Shaan from '/client/src/assets/img/teamPNG/Shaan.png';
import '/client/src/styles/CommunityPage.css';

const CommunityPage: React.FC = () => {
  return (
    <div className='bio'>
      <h1>The Ditto Team</h1>
      <ul>
        <li>
          <div className="bioPic">
            <img src={Jea} alt="Jea Lee" />
            <p>Born at a young age and inspired by the difficulty of schema migration in the field, Jea Lee started Ditto out of a small garage in New Jersey.</p>
          </div>
        </li>
        
        <li>
          <div className="bioPic">
            <img src={Jay} alt="Jay Cho" />
            <p>Jay Cho with a background in mechanical engineering found himself pivoting toward a different sector after school.
              Together, he and Jea Lee invested countless hours into laying the foundation of this tool as well as
              coordinating backend coding together.
            </p>
          </div>
        </li>
        
        <li>
          <div className="bioPic">
            <img src={Jeff} alt="Jeff Kim" />
            <p>Jeff Kim with a range of familiarity between both front and back-end coding, handled everything that
              makes this tool user friendly and easy to navigate.</p>
          </div>
        </li>
        
        <li>
          <div className="bioPic">
            <img src={Shaan} alt="Shaan Khan" />
            <p>Shaan Khan found a place in coding following an unsuccessful career in Hollywood after the hiring freeze of attractive actors.</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CommunityPage;
