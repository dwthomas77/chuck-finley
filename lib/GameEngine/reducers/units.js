const defaultUnits = {
  ship1: {
    id: 'ship1',
    type: 'ship',
    location: {x: 18, y: 8}
  }
};

export default function units(state = defaultUnits, action) {
  switch(action.type) {
    default:
      return state;
  }
}
