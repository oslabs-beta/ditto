import * as React from 'react';
import Jea from '/client/src/assets/img/teamPNG/Jea.webp'; 
import Jay from '/client/src/assets/img/teamPNG/Jay.webp';
import Jeff from '/client/src/assets/img/teamPNG/Jeff.webp';
import Shaan from '/client/src/assets/img/teamPNG/Shaan.png';
import '/client/src/styles/components/Community.css';
import '../styles/Global.css';

const Community: React.FC = () => {
  const members = [
    {
      name: 'Jea Lee',
      image: Jea,
      bio: 'Frustrated with the difficulties of schema migration, Jea Lee set out to implement a tool to facilitate this task for software engineers and database management teams alike.',
      github: 'https://github.com/jealee44'
    },
    {
      name: 'Jay Cho',
      image: Jay,
      bio: 'Jay Cho, after pivoting from mechanical engineering invested countless hours alongside Jea Lee and Jeff Kim in laying the foundation of this tool.',
      github: 'https://github.com/jayc-gh'
    },
    {
      name: 'Jeff Kim',
      image: Jeff,
      bio: 'Jeff Kim with familiarity ranging between front and back-end coding, handled everything that makes this tool user friendly and easy to navigate.',
      github: 'https://github.com/syjeffkim'
    },
    {
      name: 'Shaan Khan',
      image: Shaan,
      bio: 'Shaan Khan explored coding after an initial interest in Python. He moved on to learn JavaScript and React, subsequently joining the team in 2024.',
      github: 'https://github.com/shaanmalkovich'
    }
  ];

  return (
    <div className='bio'>
      <h1 className='sectionTitle'>The Team</h1>
      <ul>
        {members.map(member => (
          <li key={member.name}>
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="bioPicLink">
              <div className="bioPic">
                <img src={member.image} alt={member.name} />
                <p className='bioSection'>{member.bio}</p>
              </div>
            </a>
          </li>
        ))};
      </ul>
    </div>
  );
}

export default Community;
