class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    // Generate all tile textures procedurally — no art files needed yet
    this._makeTile('tile_floor',    COLORS.floor,    COLORS.floorAlt);
    this._makeTile('tile_wall',     COLORS.wall,     COLORS.wallTop);
    this._makeTile('tile_grass',    COLORS.grass,    COLORS.grassAlt);
    this._makeTile('tile_path',     COLORS.path,     COLORS.floor);
    this._makeTile('tile_water',    COLORS.water,    0x0e2a40);
    this._makePlayerTexture();
    this.scene.start('Title');
  }

  _makeTile(key, base, accent) {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(base);
    g.fillRect(0, 0, TILE, TILE);
    // subtle border
    g.fillStyle(accent, 0.3);
    g.fillRect(0, 0, TILE, 1);
    g.fillRect(0, 0, 1, TILE);
    g.fillStyle(0x000000, 0.2);
    g.fillRect(TILE - 1, 0, 1, TILE);
    g.fillRect(0, TILE - 1, TILE, 1);
    // small noise dots for texture
    g.fillStyle(accent, 0.15);
    for (let i = 0; i < 6; i++) {
      const rx = Phaser.Math.Between(3, TILE - 4);
      const ry = Phaser.Math.Between(3, TILE - 4);
      g.fillRect(rx, ry, 2, 2);
    }
    g.generateTexture(key, TILE, TILE);
    g.destroy();
  }

  _makePlayerTexture() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    const s = TILE;
    // shadow
    g.fillStyle(COLORS.shadow, 0.4);
    g.fillEllipse(s / 2, s - 4, s * 0.7, 6);
    // body
    g.fillStyle(COLORS.player);
    g.fillRect(s / 2 - 5, s / 2 - 4, 10, 12);
    // head
    g.fillCircle(s / 2, s / 2 - 8, 7);
    // highlight
    g.fillStyle(COLORS.playerOutline, 0.6);
    g.fillCircle(s / 2 - 2, s / 2 - 10, 3);
    // sword
    g.fillStyle(0xcccccc);
    g.fillRect(s / 2 + 5, s / 2 - 12, 2, 16);
    g.generateTexture('player', s, s);
    g.destroy();
  }
}
