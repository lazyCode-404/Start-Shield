// CommunityDiscussions.jsx

import React, { useState, useEffect } from 'react';

const CommunityDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
 
    // Logic for retrieving discussions (backend call in Motoko)
// Update the state of 'discussions' with the received data
// Example: setDiscussions([...receivedDiscussions]);

  }, []);

  return (
    <div className="community-discussions">
      <h2>Community Discussions</h2>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>
            <h3>{discussion.title}</h3>
            <p>{discussion.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityDiscussions;
