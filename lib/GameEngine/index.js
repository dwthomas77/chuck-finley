import { createStore, combineReducers, applyMiddleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducers from './reducers';
import { SELECT_UNIT } from './reducers/selectedUnit';
import { MOVE_UNIT } from './actions';
import { createMap } from 'lib/MapManager';

let Game = null;
let Map = null;

export const defaultGame = {
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

function observeStore(store, onChange) {
  let currentState;

  function handleChange() {
    let nextState = store.getState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }
  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

const selectUnit = (unit) => {
  console.log('selecting unit', unit);
  Game.dispatch({ type: SELECT_UNIT, payload: unit });
}

const moveUnit = (unit, targetHex) => {
  console.log('you want to move this unit', unit, targetHex)
  Game.dispatch({ type: MOVE_UNIT, payload: { unit, targetHex } });
};

export const createNewGame = ({ updateHandler }) => {
  Game = createStore(reducers, {}, devToolsEnhancer());
  observeStore(Game, updateHandler);

  Map = createMap(defaultGame);
  const actions = {
    [MOVE_UNIT]: moveUnit,
    [SELECT_UNIT]: selectUnit,
  }
  return {game: Game.getState(), Map, actions};
}


