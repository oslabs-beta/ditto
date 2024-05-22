import * as React from 'react';
import Jea from '/client/src/assets/img/teamPNG/Jea.png';
import Jay from '/client/src/assets/img/teamPNG/Jay.png';
import Jeff from '/client/src/assets/img/teamPNG/Jeff.png';
import Shaan from '/client/src/assets/img/teamPNG/Shaan.png';
import '/client/src/styles/Community.css';

const Community: React.FC = () => {
  const members = [
    {
      name: 'Jea Lee',
      image: Jea,
      bio: 'Born at a young age and inspired by the difficulty of schema migration in the field, Jea Lee started Ditto out of a small garage in New Jersey.',
      github: 'https://github.com/jealee44'
    },
    {
      name: 'Jay Cho',
      image: Jay,
      bio: 'Jay Cho with a background in mechanical engineering found himself pivoting toward a different sector after school. Together, he and Jea Lee invested countless hours into laying the foundation of this tool as well as coordinating backend coding together.',
      github: 'https://github.com/jayc-gh'
    },
    {
      name: 'Jeff Kim',
      image: Jeff,
      bio: 'Jeff Kim with a range of familiarity between both front and back-end coding, handled everything that makes this tool user friendly and easy to navigate.',
      github: 'https://github.com/syjeffkim'
    },
    {
      name: 'Shaan Khan',
      image: Shaan,
      bio: 'Shaan Khan found a place in coding following an unsuccessful career in Hollywood after the hiring freeze of attractive actors.',
      github: 'https://github.com/shaanmalkovich'
    }
  ];

  return (
    <div className='bio'>
      <h1>The Ditto Team</h1>
      <ul>
        {members.map(member => (
          <li key={member.name}>
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="bioPicLink">
              <div className="bioPic">
                <img src={member.image} alt={member.name} />
                <p>{member.bio}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;
