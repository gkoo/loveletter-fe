import React from 'react';

function PlayerList({ players }) {
  return (
    <>
      <h4>Players</h4>
      {
        Object.values(players).map(player => {
          return player.name && (
            <div key={player.id}>
              {player.isLeader && '👑'} {player.name}
            </div>
          )
        })
      }
    </>
  );
};

export default PlayerList;
