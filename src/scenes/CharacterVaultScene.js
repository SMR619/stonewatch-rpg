class CharacterVaultScene extends Phaser.Scene {
  constructor() { super('CharacterVault'); }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  create() {
    this.characters   = CharacterVault.getAll();
    this.selectedIdx  = this.characters.length > 0 ? 0 : -1;
    this.listOffset   = 0;   // scroll offset for vault list
    this.statusMsg    = '';
    this.statusTimer  = 0;

    this._drawChrome();
    this._buildVaultList();
    this._buildStatsPanel();
    this._buildPartySlots();
    this._buildButtons();
    this._buildStatusBar();

    this._refresh();

    this.input.keyboard.on('keydown', this._onKey, this);
  }

  // ─── Static chrome (drawn once) ───────────────────────────────────────────

  _drawChrome() {
    const g = this.add.graphics();

    // Background
    g.fillStyle(0x0a0a0f);
    g.fillRect(0, 0, 800, 600);

    // Outer border
    g.lineStyle(2, 0x8b0000, 0.9);
    g.strokeRect(6, 6, 788, 588);
    g.lineStyle(1, 0x3a1a0a, 0.5);
    g.strokeRect(10, 10, 780, 580);

    // Panel backgrounds
    g.fillStyle(0x0d0d14, 1);
    g.fillRect(14, 44, 312, 460);   // left panel
    g.fillRect(334, 44, 454, 460);  // right panel

    // Panel borders
    g.lineStyle(1, 0xc8a84b, 0.4);
    g.strokeRect(14, 44, 312, 460);
    g.strokeRect(334, 44, 454, 460);

    // Title
    this.add.text(400, 24, 'CHARACTER VAULT', {
      fontFamily: 'serif', fontSize: '18px', color: '#e8d48b', letterSpacing: 6,
    }).setOrigin(0.5, 0.5);

    // Left panel header
    this.add.text(170, 56, 'VAULT', {
      fontFamily: 'monospace', fontSize: '11px', color: '#c8a84b', letterSpacing: 4,
    }).setOrigin(0.5, 0);

    // Right panel headers
    this.add.text(388, 56, 'CHARACTER', {
      fontFamily: 'monospace', fontSize: '11px', color: '#c8a84b', letterSpacing: 4,
    }).setOrigin(0, 0);

    // Divider line in right panel (between stats and party)
    const divG = this.add.graphics();
    divG.lineStyle(1, 0x3a2a0a, 0.8);
    divG.lineBetween(334, 350, 788, 350);

    this.add.text(388, 356, 'CURRENT PARTY — SECTION 1', {
      fontFamily: 'monospace', fontSize: '10px', color: '#c8a84b', letterSpacing: 3,
    }).setOrigin(0, 0);

    // Bottom bar background
    const bar = this.add.graphics();
    bar.fillStyle(0x080810, 1);
    bar.fillRect(6, 512, 788, 82);
    bar.lineStyle(1, 0x3a2a0a);
    bar.lineBetween(6, 512, 794, 512);

    // Keyboard hints
    this.add.text(14, 592, '↑↓ Navigate   ENTER Select   DEL Delete   ESC Back', {
      fontFamily: 'monospace', fontSize: '9px', color: '#3a3a3a',
    }).setOrigin(0, 1);
  }

  // ─── Vault list ───────────────────────────────────────────────────────────

  _buildVaultList() {
    this._listTexts = [];
    const maxVisible = 16;
    for (let i = 0; i < maxVisible; i++) {
      const t = this.add.text(20, 72 + i * 25, '', {
        fontFamily: 'monospace', fontSize: '11px', color: '#6a5a3a',
      });
      this._listTexts.push(t);
    }
    // "Empty vault" message
    this._emptyText = this.add.text(170, 260, 'No characters.\nPress CREATE NEW\nto begin.', {
      fontFamily: 'monospace', fontSize: '12px', color: '#3a3a3a',
      align: 'center',
    }).setOrigin(0.5);
  }

  _refreshVaultList() {
    const maxVisible = 16;
    this._emptyText.setVisible(this.characters.length === 0);

    for (let i = 0; i < maxVisible; i++) {
      const charIdx = i + this.listOffset;
      const char = this.characters[charIdx];
      const t = this._listTexts[i];

      if (!char) {
        t.setText('').setVisible(false);
        continue;
      }

      t.setVisible(true);
      const prefix = charIdx === this.selectedIdx ? '► ' : '  ';
      const label  = `${prefix}${char.name.padEnd(12).slice(0, 12)} ${char.class.padEnd(7).slice(0, 7)} L${char.level}`;
      t.setText(label);

      if (charIdx === this.selectedIdx) {
        t.setColor('#e8d48b').setBackgroundColor('#1a0f00');
      } else {
        t.setColor('#6a5a3a').setBackgroundColor('');
      }
    }
  }

  // ─── Stats panel ──────────────────────────────────────────────────────────

  _buildStatsPanel() {
    // Portrait box
    this._portraitBox = this.add.graphics();

    // Name / class / ancestry row
    this._statName = this.add.text(430, 60, '', {
      fontFamily: 'serif', fontSize: '18px', color: '#e8d48b',
    });
    this._statSub = this.add.text(430, 82, '', {
      fontFamily: 'monospace', fontSize: '10px', color: '#8a7a5a',
    });

    // Ability scores — two columns of 3
    this._abilityLabels = [];
    this._abilityVals   = [];
    const cols = [
      { abilities: ['STR', 'DEX', 'CON'], x: 340, y: 106 },
      { abilities: ['INT', 'WIS', 'CHA'], x: 490, y: 106 },
    ];
    cols.forEach(col => {
      col.abilities.forEach((ab, row) => {
        const y = col.y + row * 32;
        this.add.text(col.x, y, ABILITY_LABELS[ab].slice(0, 3).toUpperCase(), {
          fontFamily: 'monospace', fontSize: '10px', color: '#5a4a2a',
        });
        const val = this.add.text(col.x + 42, y, '', {
          fontFamily: 'monospace', fontSize: '10px', color: '#e8d48b',
        });
        this._abilityVals.push({ ab, text: val });
      });
    });

    // HP / level / skills labels
    this._statLines = [];
    for (let i = 0; i < 6; i++) {
      this._statLines.push(this.add.text(340, 208 + i * 22, '', {
        fontFamily: 'monospace', fontSize: '10px', color: '#8a7a5a',
        wordWrap: { width: 440 },
      }));
    }

    // Background graphic for portrait area
    this.add.graphics().fillStyle(0x0a0808).fillRect(338, 58, 86, 110);
  }

  _refreshStatsPanel() {
    const char = this.characters[this.selectedIdx];

    if (!char) {
      this._statName.setText('');
      this._statSub.setText('');
      this._abilityVals.forEach(v => v.text.setText(''));
      this._statLines.forEach(l => l.setText(''));
      this._portraitBox.clear();
      return;
    }

    // Portrait
    const pc = PORTRAIT_COLORS[char.portrait] || 0x3a3a3a;
    this._portraitBox.clear();
    this._portraitBox.fillStyle(pc, 1);
    this._portraitBox.fillRect(338, 58, 86, 110);
    this._portraitBox.lineStyle(1, 0xc8a84b, 0.6);
    this._portraitBox.strokeRect(338, 58, 86, 110);
    // Simple silhouette — circle head + body
    this._portraitBox.fillStyle(0x000000, 0.35);
    this._portraitBox.fillCircle(381, 92, 18);
    this._portraitBox.fillRect(365, 110, 32, 40);

    // Name
    this._statName.setText(char.name);
    this._statSub.setText(
      `${char.ancestry} ${char.class}  •  Level ${char.level}  •  Sec. ${char.section}`
    );

    // Ability scores
    this._abilityVals.forEach(({ ab, text }) => {
      const score = char.abilities[ab];
      const mod   = calcModifier(score);
      const sign  = mod >= 0 ? '+' : '';
      text.setText(`${score} (${sign}${mod})`);
    });

    // Info lines
    const lines = [
      `HP:         ${char.hp}`,
      `Heritage:   ${char.heritage}`,
      `Background: ${char.background}`,
      `Skills:     ${char.skills.join(', ')}`,
    ];
    if (char.campaignBond) lines.push(`Bond:       ${char.campaignBond}`);

    lines.forEach((line, i) => {
      if (this._statLines[i]) this._statLines[i].setText(line);
    });
    for (let i = lines.length; i < this._statLines.length; i++) {
      this._statLines[i].setText('');
    }
  }

  // ─── Party slots ──────────────────────────────────────────────────────────

  _buildPartySlots() {
    this._partySlots = [];
    for (let i = 0; i < 6; i++) {
      const col   = i < 3 ? 0 : 1;
      const row   = i % 3;
      const x     = 340 + col * 230;
      const y     = 368 + row * 28;
      const label = this.add.text(x, y, '', {
        fontFamily: 'monospace', fontSize: '10px', color: '#6a5a3a',
      });
      this._partySlots.push(label);
    }
  }

  _refreshPartySlots() {
    const party = CampaignSave.getSection1Party();
    for (let i = 0; i < 6; i++) {
      const charId = party[i];
      const char   = charId ? CharacterVault.get(charId) : null;
      const label  = char ? char.name : '--- EMPTY ---';
      this._partySlots[i].setText(`${i + 1}. ${label}`);
      this._partySlots[i].setColor(char ? '#c8a84b' : '#3a3a3a');
    }
  }

  // ─── Buttons ──────────────────────────────────────────────────────────────

  _buildButtons() {
    const defs = [
      { label: '[CREATE NEW]',      x:  20, action: () => this._createNew() },
      { label: '[DELETE]',          x: 145, action: () => this._deleteCharacter() },
      { label: '[ADD TO PARTY]',    x: 250, action: () => this._addToParty() },
      { label: '[REMOVE FROM PTY]', x: 405, action: () => this._removeFromParty() },
      { label: '[BACK]',            x: 600, action: () => this._goBack() },
    ];

    defs.forEach(def => {
      const t = this.add.text(def.x, 520, def.label, {
        fontFamily: 'monospace', fontSize: '12px', color: '#c8a84b',
        padding: { x: 4, y: 3 },
      });
      t.setInteractive({ cursor: 'pointer' });
      t.on('pointerover',  () => t.setColor('#e8d48b'));
      t.on('pointerout',   () => t.setColor('#c8a84b'));
      t.on('pointerdown',  def.action);
    });
  }

  // ─── Status bar ───────────────────────────────────────────────────────────

  _buildStatusBar() {
    this._statusText = this.add.text(400, 565, '', {
      fontFamily: 'monospace', fontSize: '11px', color: '#e8a04b',
    }).setOrigin(0.5, 0);
  }

  _showStatus(msg, duration = 3000) {
    this._statusText.setText(msg);
    this.time.delayedCall(duration, () => { this._statusText.setText(''); });
  }

  // ─── Refresh all dynamic UI ───────────────────────────────────────────────

  _refresh() {
    this._refreshVaultList();
    this._refreshStatsPanel();
    this._refreshPartySlots();
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  _createNew() {
    this.scene.start('CharacterCreation');
  }

  _deleteCharacter() {
    const char = this.characters[this.selectedIdx];
    if (!char) { this._showStatus('No character selected.'); return; }

    // Remove from both parties
    const s1 = CampaignSave.getSection1Party().filter(id => id !== char.id);
    CampaignSave.setParty(1, s1);
    const s2 = CampaignSave.getSection2Party().filter(id => id !== char.id);
    CampaignSave.setParty(2, s2);

    CharacterVault.delete(char.id);
    this.characters  = CharacterVault.getAll();
    this.selectedIdx = Math.min(this.selectedIdx, this.characters.length - 1);
    this.listOffset  = Math.min(this.listOffset, Math.max(0, this.characters.length - 16));
    this._showStatus(`${char.name} deleted.`);
    this._refresh();
  }

  _addToParty() {
    const char = this.characters[this.selectedIdx];
    if (!char) { this._showStatus('No character selected.'); return; }

    const party = CampaignSave.getSection1Party();
    if (party.includes(char.id)) { this._showStatus(`${char.name} is already in the party.`); return; }
    if (party.length >= 6)       { this._showStatus('Party is full (max 6).'); return; }

    party.push(char.id);
    CampaignSave.setParty(1, party);
    this._showStatus(`${char.name} added to party.`);
    this._refreshPartySlots();
  }

  _removeFromParty() {
    const char = this.characters[this.selectedIdx];
    if (!char) { this._showStatus('No character selected.'); return; }

    const party = CampaignSave.getSection1Party();
    if (!party.includes(char.id)) { this._showStatus(`${char.name} is not in the party.`); return; }

    CampaignSave.setParty(1, party.filter(id => id !== char.id));
    this._showStatus(`${char.name} removed from party.`);
    this._refreshPartySlots();
  }

  _goBack() {
    this.scene.start('Title');
  }

  // ─── Keyboard ─────────────────────────────────────────────────────────────

  _onKey(event) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.selectedIdx > 0) {
          this.selectedIdx--;
          if (this.selectedIdx < this.listOffset) this.listOffset--;
          this._refresh();
        }
        break;

      case 'ArrowDown':
        if (this.selectedIdx < this.characters.length - 1) {
          this.selectedIdx++;
          if (this.selectedIdx >= this.listOffset + 16) this.listOffset++;
          this._refresh();
        }
        break;

      case 'Enter':
        // Enter selects and moves focus to action — treat as ADD TO PARTY shortcut
        this._addToParty();
        break;

      case 'Delete':
      case 'Backspace':
        this._deleteCharacter();
        break;

      case 'Escape':
        this._goBack();
        break;

      case 'n':
      case 'N':
        this._createNew();
        break;
    }
  }
}
