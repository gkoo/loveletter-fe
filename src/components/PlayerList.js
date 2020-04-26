import React from 'react';

function PlayerList({ users }) {
  return (
    <>
      <h4>Players</h4>
      {
        Object.values(users).map(user => {
          return user.name && (
            <div key={user.id}>
              {user.isLeader && '👑'} {user.name}
            </div>
          )
        })
      }
    </>
  );
};

export default PlayerList;
