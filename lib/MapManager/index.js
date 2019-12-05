import { extendHex, defineGrid } from 'honeycomb-grid';
import md5 from 'md5';
import { diagnol } from './generatorAlgorithms';

let Grid = null;

const generateHexIds = (grid) => {
  grid.forEach(hex => {
    hex.id = md5(`${hex.x}${hex.y}`);
  })
}

const generateMapTiles = (grid) => {
  const generator = diagnol({ maxY: 10 });
  return grid.map(generator);
}

export const createMap = (options) => {
  const Hex = extendHex({
    size: options.hexSize,           // default: 1
  });
  Grid = defineGrid(Hex).rectangle(options.map);
  generateHexIds(Grid);
  generateMapTiles(Grid);
  return Grid;
};

export const hexesInRange = (hex, distance) => Grid.hexesInRange(hex, distance);
export const hexesAreSame = (hexA, hexB) => hexA.x === hexB.x && hexA.y === hexB.y;

export const generateRowsFromGrid = (grid = []) => {
  const rows = {};
  grid.forEach((hex) => {
    if (!rows[hex.y]) {
      rows[hex.y] = [hex];
    } else {
      rows[hex.y].push(hex);
    }
  });
  const orderedKeys = Object.keys(rows).sort((a, b) => a - b);
  return orderedKeys.map(key => {
    return [...rows[key]];
  })
};
