import React from 'react';
import Card from 'components/Sheet/Card';

const sessionCardData = {
  sessionId : '001',
  sessionStatus: 'local dev'
};

const playerCardData = {
  playerId: '010',
  playerName: 'Player Wan'
};

const Sheet = () => (
  <div className="sheet">
    <div className="sheet__row">
      <Card data={sessionCardData} />
    </div>
    <div className="sheet__row">
      <Card data={playerCardData} />
    </div>
  </div>
);

export default Sheet;
