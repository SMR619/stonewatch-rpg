class TitleScene extends Phaser.Scene {
  constructor() { super('Title'); }

  create() {
    const { width, height } = this.scale;

    // Background — dark vignette
    const bg = this.add.graphics();
    bg.fillStyle(0x0a0a0f);
    bg.fillRect(0, 0, width, height);

    // Render a tiny preview map in the background
    this._drawBackgroundMap(width, height);

    // Dark overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.55);
    overlay.fillRect(0, 0, width, height);

    // Red decorative border lines
    const deco = this.add.graphics();
    deco.lineStyle(2, 0x8b0000, 0.8);
    deco.strokeRect(20, 20, width - 40, height - 40);
    deco.lineStyle(1, 0x8b0000, 0.4);
    deco.strokeRect(26, 26, width - 52, height - 52);

    // Title
    this.add.text(width / 2, height * 0.28, 'ECHOES OF', {
      fontFamily: 'serif',
      fontSize: '22px',
      color: '#c8a84b',
      letterSpacing: 12,
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.40, 'STONEWATCH KEEP', {
      fontFamily: 'serif',
      fontSize: '46px',
      color: '#e8d48b',
      stroke: '#000000',
      strokeThickness: 4,
      letterSpacing: 4,
      shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true },
    }).setOrigin(0.5);

    // Divider
    const div = this.add.graphics();
    div.lineStyle(1, 0xc8a84b, 0.7);
    div.lineBetween(width / 2 - 160, height * 0.51, width / 2 + 160, height * 0.51);

    // Subtitle
    this.add.text(width / 2, height * 0.57, 'A Gold Box-Style RPG', {
      fontFamily: 'serif',
      fontSize: '14px',
      color: '#8a7a5a',
      letterSpacing: 3,
    }).setOrigin(0.5);

    // Setting blurb
    this.add.text(width / 2, height * 0.67,
      'The Greyfang Reach  •  An Original Campaign', {
      fontFamily: 'serif',
      fontSize: '12px',
      color: '#6a5a3a',
      letterSpacing: 2,
    }).setOrigin(0.5);

    // Prompt — blink
    const prompt = this.add.text(width / 2, height * 0.82, 'PRESS ENTER OR CLICK TO BEGIN', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#e8d48b',
      letterSpacing: 3,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Version
    this.add.text(width - 30, height - 20, 'v0.1 — Scaffold', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#3a3a3a',
    }).setOrigin(1, 1);

    // Input
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('World'));
    this.input.once('pointerdown', () => this.scene.start('World'));
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
