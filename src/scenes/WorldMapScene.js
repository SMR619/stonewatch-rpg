class WorldMapScene extends Phaser.Scene {
  constructor() { super('World'); }

  create() {
    this.mapData = this._buildMap();
    this._renderTiles();
    this._spawnPlayer();
    this._setupCamera();
    this._setupInput();
    this._buildUI();
  }

  // ─── Map ──────────────────────────────────────────────────────────────────

  _buildMap() {
    // Hand-crafted starter area: outskirts of Stonewatch Town
    // W=wall, F=floor, G=grass, P=path, .=grass
    const layout = [
      'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
      'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
      'WGGGGGGGGGGGGPPPPGGGGGGGGGGGGW',
      'WGGGWWWGGGGGGPWWWGGGGGWWWGGGW',
      'WGGGWFWGGGGGGPWFWGGGGGWFWGGGW',
      'WGGGWWWGGGGGGPWWWGGGGGWWWGGGW',
      'WGGGGGGGGGGGPPPPGGGGGGGGGGGGW',
      'WGGGGGGGGGGGPGGGGGGGGGGGGGGGW',
      'WGGGWWWWWWWWPWWWWWWWGGGGGGGGW',
      'WGGGWFFFFFFWPWFFFFFFWGGGGGGGGW',
      'WGGGWFFFFFFWPWFFFFFFWGGGGGGGGW',
      'WGGGWFFFFFFWPWFFFFFFWGGGGGGGGW',
      'WGGGWWWGWWWWPWWWGWWWGGGGGGGGW',
      'WGGGGGGGGGGGPGGGGGGGGGGGGGGGGW',
      'WGGGGGGGGGGPPPPGGGGGGGGGGGGGGGW',
      'WGGGWWWWWWWWPWWWWWWWGGGGGGGGW',
      'WGGGWFFFFFFWPWFFFFFFWGGGGGGGGW',
      'WGGGWWWWWWWWPWWWWWWWGGGGGGGGW',
      'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
      'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
    ];

    return layout.map(row =>
      row.split('').map(ch => {
        if (ch === 'W') return T.WALL;
        if (ch === 'F') return T.FLOOR;
        if (ch === 'P') return T.PATH;
        return T.GRASS;
      })
    );
  }

  _renderTiles() {
    this.tileSprites = [];
    for (let y = 0; y < this.mapData.length; y++) {
      this.tileSprites[y] = [];
      for (let x = 0; x < this.mapData[y].length; x++) {
        const type = this.mapData[y][x];
        const key = this._tileKey(type);
        const sprite = this.add.image(x * TILE, y * TILE, key).setOrigin(0);
        this.tileSprites[y][x] = sprite;
      }
    }
  }

  _tileKey(type) {
    switch (type) {
      case T.WALL:  return 'tile_wall';
      case T.FLOOR: return 'tile_floor';
      case T.PATH:  return 'tile_path';
      case T.WATER: return 'tile_water';
      default:      return 'tile_grass';
    }
  }

  // ─── Player ───────────────────────────────────────────────────────────────

  _spawnPlayer() {
    // Start at the path near center
    this.playerTileX = 12;
    this.playerTileY = 7;
    this.player = this.add.image(
      this.playerTileX * TILE,
      this.playerTileY * TILE,
      'player'
    ).setOrigin(0).setDepth(10);

    this.isMoving = false;
    this.moveSpeed = 6; // pixels per frame during tween
  }

  _setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  // ─── Camera ───────────────────────────────────────────────────────────────

  _setupCamera() {
    const mapPixelW = this.mapData[0].length * TILE;
    const mapPixelH = this.mapData.length * TILE;
    this.cameras.main.setBounds(0, 0, mapPixelW, mapPixelH);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.5);
  }

  // ─── UI ───────────────────────────────────────────────────────────────────

  _buildUI() {
    // Fixed HUD (not scrolling with camera)
    this.uiScene = this.scene.get('World');
    const { width, height } = this.scale;

    // Bottom bar
    const bar = this.add.graphics().setScrollFactor(0).setDepth(100);
    bar.fillStyle(0x0a0a0f, 0.85);
    bar.fillRect(0, height - 48, width, 48);
    bar.lineStyle(1, 0x3a2a1a);
    bar.lineBetween(0, height - 48, width, height - 48);

    this.locationText = this.add.text(16, height - 36, 'Location: Stonewatch Outskirts', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#c8a84b',
    }).setScrollFactor(0).setDepth(101);

    this.coordText = this.add.text(width - 16, height - 36, '', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#5a4a2a',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(101);

    // Top mini title
    this.add.text(width / 2, 14, 'STONEWATCH KEEP  •  Overworld', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#5a4a2a',
      letterSpacing: 2,
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(101);
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  update() {
    if (this.isMoving) return;
    this.coordText.setText(`[${this.playerTileX}, ${this.playerTileY}]`);

    let dx = 0, dy = 0;
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)  || Phaser.Input.Keyboard.JustDown(this.wasd.left))  dx = -1;
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.wasd.right)) dx = 1;
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)    || Phaser.Input.Keyboard.JustDown(this.wasd.up))    dy = -1;
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)  || Phaser.Input.Keyboard.JustDown(this.wasd.down))  dy = 1;

    if (dx !== 0 || dy !== 0) {
      this._tryMove(dx, dy);
    }
  }

  _tryMove(dx, dy) {
    const nx = this.playerTileX + dx;
    const ny = this.playerTileY + dy;

    if (!this._inBounds(nx, ny)) return;
    if (this.mapData[ny][nx] === T.WALL) return;

    this.isMoving = true;
    this.playerTileX = nx;
    this.playerTileY = ny;

    this.tweens.add({
      targets: this.player,
      x: nx * TILE,
      y: ny * TILE,
      duration: 100,
      ease: 'Linear',
      onComplete: () => { this.isMoving = false; },
    });
  }

  _inBounds(x, y) {
    return y >= 0 && y < this.mapData.length && x >= 0 && x < this.mapData[y].length;
  }
}
