import * as React from 'react';
import { Link } from 'react-router-dom';
import Jea from '/client/src/assets/img/teamPNG/Jea.png';
import Jay from '/client/src/assets/img/teamPNG/Jay.png';
import Jeff from '/client/src/assets/img/teamPNG/Jeff.png';
import Shaan from '/client/src/assets/img/teamPNG/Shaan.png';

const CommunityPage: React.FC = () => {
  return (
    <div>
      <h1>The Ditto Team</h1>
      <ul>
        <li>
          <img className="bioPic" src={Jea} alt="Jea Lee" />
          <p>Born at a young age, Jea Lee started Ditto out of a small garage in New Jersey.</p>
        </li>
        <li>
          <img className="bioPic" src={Jay} alt="Jay Cho" />
          <p>Jay Cho, inspired by the television series <em>Mr. Robot</em>, found an interest in computers and engineering.</p>
        </li>
        <li>
          <img className="bioPic" src={Jeff} alt="Jeff Kim" />
          <p>Jeff Kim with a background in jiu jitsu began grappling with frontend coding in the 2020s.</p>
        </li>
        <li>
          <img className="bioPic" src={Shaan} alt="Shaan Khan" />
          <p>Shaan Khan found a place in coding following an unsuccessful career in Hollywood after the hiring freeze of attractive actors.</p>
        </li>
      </ul>
    </div>
  );
}

export default CommunityPage;
