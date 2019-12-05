import React from 'react';
import classNames from 'classnames';
import './styles.css';

const getAscii = ({ terrain, unit, hex }) => {
  if (!unit || !unit.type) {
    return '▒';
  } else {
    return <span className="ascii-ship">S</span>;
  }
}

const HexTile = (props) => {
  const {
    clickHandler,
    hex = { terrain: '' },
    unit,
    isMoveTarget,
    isSelected
  } = props;
  const {terrain} = hex;
  const hexClass = classNames(
    'hex',
    {
      '--water': terrain === 'water',
      '--land': terrain === 'land',
      '--has-unit': unit && unit.type,
      '--is-selected': isSelected,
      '--in-range': isMoveTarget,
    }
  );

  return (
    <div
      className={hexClass}
      onClick={() => clickHandler(hex)}
    >
      {getAscii({ terrain, unit, hex })}
    </div>
  );
}

export default HexTile;
