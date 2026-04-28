class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }

  create() {
    const { width, height } = this.scale;

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x0a0a0f);
    bg.fillRect(0, 0, width, height);

    this._drawBackgroundMap(width, height);

    // Dark overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.55);
    overlay.fillRect(0, 0, width, height);

    // Decorative borders
    const deco = this.add.graphics();
    deco.lineStyle(2, 0x8b0000, 0.8);
    deco.strokeRect(20, 20, width - 40, height - 40);
    deco.lineStyle(1, 0x8b0000, 0.4);
    deco.strokeRect(26, 26, width - 52, height - 52);

    // Title
    this.add.text(width / 2, height * 0.28, 'ECHOES OF', {
      fontFamily: 'serif', fontSize: '22px', color: '#c8a84b', letterSpacing: 12,
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.40, 'STONEWATCH KEEP', {
      fontFamily: 'serif', fontSize: '46px', color: '#e8d48b',
      stroke: '#000000', strokeThickness: 4, letterSpacing: 4,
      shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true },
    }).setOrigin(0.5);

    // Divider
    const div = this.add.graphics();
    div.lineStyle(1, 0xc8a84b, 0.7);
    div.lineBetween(width / 2 - 160, height * 0.51, width / 2 + 160, height * 0.51);

    this.add.text(width / 2, height * 0.57, 'A Gold Box-Style RPG', {
      fontFamily: 'serif', fontSize: '14px', color: '#8a7a5a', letterSpacing: 3,
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.65,
      'The Greyfang Reach  •  An Original Campaign', {
      fontFamily: 'serif', fontSize: '12px', color: '#6a5a3a', letterSpacing: 2,
    }).setOrigin(0.5);

    // Menu
    this.menuItems = [
      { label: 'NEW CAMPAIGN',       action: 'new' },
      { label: 'MANAGE CHARACTERS',  action: 'manage' },
      { label: 'LOAD CAMPAIGN',      action: 'load', disabled: !CampaignSave.hasSave() },
    ];
    this.selected = 0;
    this._buildMenu(width, height);

    // Version
    this.add.text(width - 30, height - 20, 'v0.2 — Character System', {
      fontFamily: 'monospace', fontSize: '10px', color: '#3a3a3a',
    }).setOrigin(1, 1);

    // Keyboard
    this.input.keyboard.on('keydown-UP',    this._menuUp,     this);
    this.input.keyboard.on('keydown-DOWN',  this._menuDown,   this);
    this.input.keyboard.on('keydown-ENTER', this._menuSelect, this);
  }

  _buildMenu(width, height) {
    const baseY = height * 0.74;
    const step  = 34;

    this._menuCursor = this.add.text(0, 0, '►', {
      fontFamily: 'monospace', fontSize: '13px', color: '#e8d48b',
    }).setOrigin(0.5);

    this._menuTexts = this.menuItems.map((item, i) => {
      const color = item.disabled ? '#3a3a3a' : '#6a5a3a';
      const t = this.add.text(width / 2 + 12, baseY + i * step, item.label, {
        fontFamily: 'monospace', fontSize: '14px', color,
        letterSpacing: 3,
      }).setOrigin(0, 0.5);

      // Click support
      if (!item.disabled) {
        t.setInteractive({ cursor: 'pointer' });
        t.on('pointerdown', () => { this.selected = i; this._menuSelect(); });
        t.on('pointerover', () => { this.selected = i; this._updateMenu(); });
      }

      return t;
    });

    this._baseY  = baseY;
    this._step   = step;
    this._mWidth = width;
    this._updateMenu();
  }

  _updateMenu() {
    const width = this._mWidth;
    this.menuItems.forEach((item, i) => {
      const isActive = i === this.selected && !item.disabled;
      this._menuTexts[i].setColor(isActive ? '#e8d48b' : (item.disabled ? '#3a3a3a' : '#6a5a3a'));
    });

    // Position cursor to the left of the selected (non-disabled) item
    const selectedText = this._menuTexts[this.selected];
    const cx = selectedText.x - 18;
    const cy = this._baseY + this.selected * this._step;
    this._menuCursor.setPosition(cx, cy);
    this._menuCursor.setVisible(!this.menuItems[this.selected].disabled);
  }

  _menuUp() {
    this.selected = (this.selected - 1 + this.menuItems.length) % this.menuItems.length;
    this._updateMenu();
  }

  _menuDown() {
    this.selected = (this.selected + 1) % this.menuItems.length;
    this._updateMenu();
  }

  _menuSelect() {
    const item = this.menuItems[this.selected];
    if (item.disabled) return;

    if (item.action === 'new' || item.action === 'manage') {
      CampaignSave.initialize();
      this.scene.start('CharacterVault');
    } else if (item.action === 'load') {
      this.scene.start('World');
    }
  }

  _drawBackgroundMap(width, height) {
    const tileW = Math.ceil(width / TILE) + 2;
    const tileH = Math.ceil(height / TILE) + 2;
    for (let y = 0; y < tileH; y++) {
      for (let x = 0; x < tileW; x++) {
        const isEdge = x === 0 || y === 0 || x === tileW - 1 || y === tileH - 1;
        const key = isEdge ? 'tile_wall' : (Math.random() > 0.85 ? 'tile_floor' : 'tile_grass');
        this.add.image(x * TILE, y * TILE, key).setOrigin(0).setAlpha(0.6);
      }
    }
  }
}
