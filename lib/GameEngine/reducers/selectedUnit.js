export const SELECT_UNIT = 'select_unit';

export default function selectedUnit(state = null, action) {
  switch(action.type) {
    case SELECT_UNIT:
      return action.payload;
    default:
      return state;
  }
}
