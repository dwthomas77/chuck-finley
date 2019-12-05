import React, { useState } from 'react';
import { defineGrid } from 'honeycomb-grid';
import memoizeOne from 'memoize-one';
import { generateRowsFromGrid, hexesAreSame, hexesInRange } from 'lib/MapManager';
import { SELECT_UNIT } from 'lib/GameEngine/reducers/selectedUnit';
import { MOVE_UNIT } from 'lib/GameEngine/actions';
import HexTile from 'components/Map/HexTile';
import './styles.css';

const MOVE_DIST = 1;

/**
 * Combines units from the Game onto the Map
 * @param {[]Object} Map
 * @param {Object} Game
 */
const resolveUnits = (Map, { units }) => {
  for (const [id, unit] of Object.entries(units)) {
    const { location: { x, y } } = unit;
    const target = Map.find(hex => hex.x===x && hex.y===y);
    target.unit = {...unit};
  }
}

/**
 * Returns the unit that is located on the provided hex
 * @param {Object} hex
 * @param {Object[]} units
 */
const getUnitFromHex = (hex, units) => {
  return units[Object.keys(units).find(key => units[key].location.x === hex.x && units[key].location.y === hex.y)] || null;
}

/**
 * Returns the hex that is the location of the provided unit
 * @param {Object} unit
 * @param {Object[]} Map
 */
const getHexFromUnit = (unit, Map) => {
  return Map.find(hex => hex.y === unit.location.y && hex.x === unit.location.x)
}

/**
 * Returns a list of hexes that are valid targets of modified Game state actions
 * @param {Object[]} hex
 */
const generateTargetHexes = (hex) => hexesInRange(hex, MOVE_DIST);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetHexes: [],
    }
  }

  unitClickHandler = (hex) => {
    this.props.actions[SELECT_UNIT](getUnitFromHex(hex, this.props.game.units));
  }

  unitMoveHandler = (hex, unit) => {
    this.props.actions[MOVE_UNIT](this.props.game.selectedUnit, hex);
  }

  componentDidCatch(error, errorInfo) {
    console.log(`🚨🚨🚨 ERROR TIME!!!!! 🚨🚨🚨`);
    console.log(error, errorInfo);
  }

  render() {
    const {Map, game} = this.props;
    const rows = Map && generateRowsFromGrid(Map);
    const targetHexes = game.selectedUnit ? generateTargetHexes(getHexFromUnit(game.selectedUnit, Map)) : [];

    return (rows && rows.length && <div className="cf-map-layout" id="cf-map-id">
      <div className="cf-map">
        {rows.map(row => (
          <div className='cf-map__row'>
            {row.map(hex => {
              const hexUnit = getUnitFromHex(hex, game.units);
              const isMoveTarget = targetHexes.length && targetHexes.find(targetHex => hexesAreSame(targetHex, hex));
              const isSelected = hexUnit && game.selectedUnit && hexUnit.id === game.selectedUnit.id;

              const clickHandler = isMoveTarget && !isSelected ? this.unitMoveHandler : this.unitClickHandler;

              return (
                <HexTile
                  hex={hex}
                  isMoveTarget={isMoveTarget}
                  isSelected={isSelected}
                  unit={hexUnit}
                  clickHandler={clickHandler}
                />
              );
            })}
           </div>
        ))}
      </div>
    </div>);
  }
}

export default Map;
