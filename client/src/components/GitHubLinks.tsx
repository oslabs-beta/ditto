import React from "react";

const GitHubLinks: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  return (
    <button className="GitHubInfo">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {name}'s GitHub
      </a>
    </button>
  );
}

export default GitHubLinks;
