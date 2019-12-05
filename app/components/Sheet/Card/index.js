import React from 'react';

const Card = (props) => {
  const { data = {} } = props;
  return (
    <div>
      <ul>
        {Object.keys(data).map(key => <li key={key}>{data[key]}</li>)}
      </ul>
    </div>);
};

export default Card;
