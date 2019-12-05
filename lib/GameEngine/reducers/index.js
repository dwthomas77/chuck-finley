import { combineReducers } from 'redux'
import selectedUnit from './selectedUnit';
import units from './units';
const defaultGame = {
  map: {
    width: 20,
    height: 10,
    start: {x: 0, y: 0}
  },
  hexSize: 30,
  units: {
    ship1: {
      id: 'ship1',
      type: 'ship',
      location: {x: 18, y: 8}
    }
  },
  selectedUnit: null,
}


const map = (state = defaultGame.map, action) => state;
const hexSize = (state = defaultGame.hexSize, action) => state;

const reducers = {
  hexSize,
  map,
  selectedUnit,
  units,
};

export default combineReducers({...reducers});
