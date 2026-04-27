const TILE = 32;
const MAP_W = 30;
const MAP_H = 20;

const COLORS = {
  void:     0x0a0a0f,
  floor:    0x3a2a1a,
  floorAlt: 0x2f2416,
  wall:     0x1c1c2e,
  wallTop:  0x2a2a42,
  grass:    0x1e3a14,
  grassAlt: 0x254a18,
  water:    0x0d2233,
  path:     0x4a3a28,
  player:   0xe8d48b,
  playerOutline: 0xfff0b0,
  shadow:   0x000000,
};

// tile type IDs
const T = {
  VOID:  0,
  FLOOR: 1,
  WALL:  2,
  GRASS: 3,
  PATH:  4,
  WATER: 5,
};
