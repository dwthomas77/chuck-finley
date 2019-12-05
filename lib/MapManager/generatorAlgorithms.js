const terrain = {
  WATER: 'water',
  LAND: 'land',
};

export const totallyFuckingRandom = (hex) => {
  return Math.random() < 0.5 ? terrain.WATER : terrain.LAND;
}

export const diagnol = options => (hex) => {
  const { maxY, offset = -5 } = options;
  const { x, y } = hex;
  if (x > (maxY - (y + offset))) {
    hex.terrain = terrain.WATER;
  } else {
    hex.terrain = terrain.LAND;
  }
}
