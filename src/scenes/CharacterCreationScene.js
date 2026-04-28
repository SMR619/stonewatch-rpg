class CharacterCreationScene extends Phaser.Scene {
  constructor() { super('CharacterCreation'); }

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  create() {
    this.step    = 1;
    this.cursor  = 0;

    // Step 5 — free boost tracking
    this.abilityFreeBoosts = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
    this.abilityCursor     = 0;

    // Step 6 — portrait/name/confirm/back
    this.step6Row = 0; // 0=portrait,1=name,2=confirm,3=back

    this.menuScrollOffset = 0;

    this.choices = {
      ancestry:   null,
      heritage:   null,
      background: null,
      class:      null,
      portrait:   0,
      name:       '',
    };

    this._displayObjects = [];
    this._renderStep();
    this.input.keyboard.on('keydown', this._onKey, this);
  }

  // ─── Display object management ────────────────────────────────────────────

  _clearDisplay() {
    this._displayObjects.forEach(o => { if (o && !o.destroyed) o.destroy(); });
    this._displayObjects = [];
  }

  _track(obj) {
    this._displayObjects.push(obj);
    return obj;
  }

  _text(x, y, str, style) {
    return this._track(this.add.text(x, y, str, style));
  }

  _gfx() {
    return this._track(this.add.graphics());
  }

  // ─── Shared chrome ────────────────────────────────────────────────────────

  _drawChrome(title) {
    const g = this._gfx();
    g.fillStyle(0x0a0a0f);
    g.fillRect(0, 0, 800, 600);

    g.lineStyle(2, 0x8b0000, 0.9);
    g.strokeRect(6, 6, 788, 588);
    g.lineStyle(1, 0x3a1a0a, 0.5);
    g.strokeRect(10, 10, 780, 580);

    // Step bar at top
    g.fillStyle(0x0d0d14);
    g.fillRect(14, 14, 772, 30);
    g.lineStyle(1, 0x3a2a0a);
    g.lineBetween(14, 44, 786, 44);

    // Step indicator
    const stepLabel = `STEP ${this.step} OF 6`;
    this._text(20, 22, stepLabel, {
      fontFamily: 'monospace', fontSize: '11px', color: '#5a4a2a', letterSpacing: 2,
    });

    // Step title
    this._text(400, 22, title, {
      fontFamily: 'serif', fontSize: '15px', color: '#e8d48b', letterSpacing: 4,
    }).setOrigin(0.5, 0);

    // Navigation hints
    this._text(400, 583, '↑↓ Navigate   ENTER Confirm   ESC Back', {
      fontFamily: 'monospace', fontSize: '9px', color: '#3a3a3a',
    }).setOrigin(0.5, 1);

    // Left panel background
    g.fillStyle(0x0d0d14);
    g.fillRect(14, 48, 310, 516);
    g.lineStyle(1, 0xc8a84b, 0.3);
    g.strokeRect(14, 48, 310, 516);

    // Right panel background
    g.fillStyle(0x0d0d14);
    g.fillRect(332, 48, 458, 516);
    g.lineStyle(1, 0xc8a84b, 0.3);
    g.strokeRect(332, 48, 458, 516);
  }

  // ─── List-style steps (1–4) helper ───────────────────────────────────────

  _drawMenuList(items, selectedIndex) {
    const MAX_VISIBLE = 16;
    const startY = 68;
    const rowH   = items.length > 6 ? 28 : 34;
    const offset = this.menuScrollOffset;

    if (offset > 0) {
      this._text(22, startY - 16, '▲ more', {
        fontFamily: 'monospace', fontSize: '10px', color: '#5a4a2a',
      });
    }

    const visible = items.slice(offset, offset + MAX_VISIBLE);
    visible.forEach((item, i) => {
      const absIdx = offset + i;
      const y      = startY + i * rowH;
      const active = absIdx === selectedIndex;
      const color  = active ? '#e8d48b' : '#6a5a3a';
      const prefix = active ? '►' : ' ';

      this._text(22, y, prefix, {
        fontFamily: 'monospace', fontSize: '12px', color: '#e8d48b',
      });
      this._text(36, y, item, {
        fontFamily: 'monospace', fontSize: '12px', color,
      });
    });

    if (offset + MAX_VISIBLE < items.length) {
      this._text(22, startY + MAX_VISIBLE * rowH, '▼ more', {
        fontFamily: 'monospace', fontSize: '10px', color: '#5a4a2a',
      });
    }
  }

  _drawDetailPanel(lines) {
    // lines: array of { text, style } or plain strings
    let y = 58;
    lines.forEach(entry => {
      if (typeof entry === 'string') {
        // blank spacer
        if (entry === '') { y += 10; return; }
        this._text(342, y, entry, {
          fontFamily: 'monospace', fontSize: '11px', color: '#8a7a5a',
          wordWrap: { width: 440 },
        });
        y += 16;
      } else {
        this._text(342, y, entry.text, Object.assign({
          fontFamily: 'monospace', fontSize: '11px', color: '#8a7a5a',
          wordWrap: { width: 440 },
        }, entry.style || {}));
        y += (entry.lineH || 16);
      }
    });
  }

  _drawNavHints(backLabel = 'ESC Back') {
    const g = this._gfx();
    g.fillStyle(0x0a0a10);
    g.fillRect(14, 540, 772, 42);
    g.lineStyle(1, 0x3a2a0a);
    g.lineBetween(14, 540, 786, 540);

    this._text(400, 558, `↑↓ Navigate   ENTER Confirm   ${backLabel}`, {
      fontFamily: 'monospace', fontSize: '10px', color: '#3a3a3a',
    }).setOrigin(0.5, 0);
  }

  // ─── Step router ──────────────────────────────────────────────────────────

  _renderStep() {
    this._clearDisplay();
    switch (this.step) {
      case 1: this._renderAncestry();   break;
      case 2: this._renderHeritage();   break;
      case 3: this._renderBackground(); break;
      case 4: this._renderClass();      break;
      case 5: this._renderAbilities();  break;
      case 6: this._renderPortrait();   break;
    }
  }

  // ─── Step 1: Ancestry ─────────────────────────────────────────────────────

  _renderAncestry() {
    this._drawChrome('CHOOSE YOUR ANCESTRY');

    const names = ANCESTRIES.map(a => a.name);
    this._drawMenuList(names, this.cursor);

    const anc = ANCESTRIES[this.cursor];
    const boostStr = anc.abilityBoosts.map(b => b === 'free' ? 'Any' : b).join(', ');
    const flawStr  = anc.abilityFlaw || 'None';

    this._drawDetailPanel([
      { text: anc.name,   style: { fontSize: '16px', color: '#e8d48b' }, lineH: 24 },
      '',
      anc.description,
      '',
      { text: `BASE HP:   ${anc.hp}`, style: { color: '#c8a84b' } },
      { text: `BOOSTS:    ${boostStr}`, style: { color: '#c8a84b' } },
      { text: `FLAW:      ${flawStr}`,  style: { color: anc.abilityFlaw ? '#e04a4a' : '#5a4a2a' } },
      '',
      { text: 'HERITAGES:', style: { color: '#8a7a5a' } },
      ...anc.heritages.map(h => `  • ${h.name}`),
    ]);

    this._drawNavHints('ESC → Title');
  }

  // ─── Step 2: Heritage ─────────────────────────────────────────────────────

  _renderHeritage() {
    this._drawChrome('CHOOSE YOUR HERITAGE');

    const anc       = ANCESTRIES.find(a => a.name === this.choices.ancestry);
    const heritages = anc.heritages;
    const names     = heritages.map(h => h.name);
    this._drawMenuList(names, this.cursor);

    const her = heritages[this.cursor];
    this._drawDetailPanel([
      { text: her.name, style: { fontSize: '15px', color: '#e8d48b' }, lineH: 24 },
      '',
      her.description,
      '',
      { text: `ANCESTRY: ${anc.name}`, style: { color: '#5a4a2a' } },
    ]);

    this._drawNavHints();
  }

  // ─── Step 3: Background ───────────────────────────────────────────────────

  _renderBackground() {
    this._drawChrome('CHOOSE YOUR BACKGROUND');

    const names = BACKGROUNDS.map(b => b.name);
    this._drawMenuList(names, this.cursor);

    const bg = BACKGROUNDS[this.cursor];
    this._drawDetailPanel([
      { text: bg.name, style: { fontSize: '15px', color: '#e8d48b' }, lineH: 24 },
      '',
      bg.description,
      '',
      { text: 'ABILITY BOOSTS:', style: { color: '#c8a84b' } },
      `  ${bg.abilityBoosts.join(' or ')}`,
      '',
      { text: 'TRAINED SKILLS:', style: { color: '#c8a84b' } },
      ...bg.skills.map(s => `  • ${s}`),
    ]);

    this._drawNavHints();
  }

  // ─── Step 4: Class ────────────────────────────────────────────────────────

  _renderClass() {
    this._drawChrome('CHOOSE YOUR CLASS');

    const names = CLASSES.map(c => c.name);
    this._drawMenuList(names, this.cursor);

    const cls = CLASSES[this.cursor];
    this._drawDetailPanel([
      { text: cls.name, style: { fontSize: '15px', color: '#e8d48b' }, lineH: 24 },
      '',
      cls.description,
      '',
      { text: `HP PER LEVEL:  +${cls.hp}`, style: { color: '#c8a84b' } },
      { text: `KEY ABILITY:   ${cls.keyAbility.join(' or ')}`, style: { color: '#c8a84b' } },
      '',
      { text: 'PROFICIENCIES:', style: { color: '#8a7a5a' } },
      ...cls.startingProficiencies.map(p => `  • ${p}`),
      '',
      { text: 'CLASS FEATURE:', style: { color: '#8a7a5a' } },
      { text: `  ${cls.special}`, style: { color: '#6a5a3a' }, lineH: 28 },
    ]);

    this._drawNavHints();
  }

  // ─── Step 5: Ability Scores ───────────────────────────────────────────────

  _renderAbilities() {
    this._drawChrome('ASSIGN ABILITY BOOSTS');

    const baseScores  = calcBaseAbilities(this.choices.ancestry, this.choices.background, this.choices.class);
    const totalFree   = Object.values(this.abilityFreeBoosts).reduce((a, b) => a + b, 0);
    const remaining   = 4 - totalFree;

    // Title lines
    this._text(22, 58, 'Ancestry, background, and class boosts applied automatically.', {
      fontFamily: 'monospace', fontSize: '10px', color: '#5a4a2a',
      wordWrap: { width: 760 },
    });
    this._text(22, 74, 'Assign your 4 remaining free boosts below.', {
      fontFamily: 'monospace', fontSize: '10px', color: '#5a4a2a',
    });

    // Remaining counter
    const remColor = remaining === 0 ? '#4aa84b' : '#e8d48b';
    this._text(600, 58, `FREE BOOSTS`, {
      fontFamily: 'monospace', fontSize: '11px', color: '#5a4a2a',
    });
    this._text(600, 74, `REMAINING: ${remaining}`, {
      fontFamily: 'monospace', fontSize: '13px', color: remColor,
    });

    // Ability rows
    ABILITY_NAMES.forEach((ab, i) => {
      const y         = 108 + i * 62;
      const freeCount = this.abilityFreeBoosts[ab];
      const score     = this._computeScore(baseScores, ab);
      const mod       = calcModifier(score);
      const modStr    = (mod >= 0 ? '+' : '') + mod;
      const active    = i === this.abilityCursor;

      // Row background highlight
      if (active) {
        const hi = this._gfx();
        hi.fillStyle(0x2a1a00, 0.7);
        hi.fillRect(14, y - 6, 772, 52);
      }

      // Cursor
      this._text(22, y + 10, active ? '►' : ' ', {
        fontFamily: 'monospace', fontSize: '14px', color: '#e8d48b',
      });

      // Ability full name
      this._text(42, y + 10, ABILITY_LABELS[ab].toUpperCase(), {
        fontFamily: 'monospace', fontSize: '13px',
        color: active ? '#e8d48b' : '#8a7a5a',
      });

      // Score
      this._text(210, y + 10, String(score).padStart(2), {
        fontFamily: 'monospace', fontSize: '18px',
        color: active ? '#e8d48b' : '#c8a84b',
      });

      // Modifier
      this._text(250, y + 10, modStr, {
        fontFamily: 'monospace', fontSize: '14px',
        color: mod >= 0 ? '#4aa84b' : '#e04a4a',
      });

      // Boost indicators (free boosts on this ability)
      if (freeCount > 0) {
        this._text(300, y + 10, `+${freeCount} free`, {
          fontFamily: 'monospace', fontSize: '11px', color: '#c8a84b',
        });
      }

      // Sources annotation
      this._text(42, y + 30, this._abilitySourceStr(ab), {
        fontFamily: 'monospace', fontSize: '9px', color: '#3a3a3a',
      });

      // +/- controls when this row is active
      if (active) {
        const canAdd    = remaining > 0;
        const canRemove = freeCount > 0;
        this._text(520, y + 10, canAdd ? '[+]' : '[+]', {
          fontFamily: 'monospace', fontSize: '12px', color: canAdd ? '#c8a84b' : '#3a3a3a',
        });
        this._text(560, y + 10, canRemove ? '[-]' : '[-]', {
          fontFamily: 'monospace', fontSize: '12px', color: canRemove ? '#c8a84b' : '#3a3a3a',
        });
      }
    });

    // HP preview
    const freeBoostScores = calcFinalAbilities(
      this.choices.ancestry, this.choices.background, this.choices.class, this.abilityFreeBoosts
    );
    const level = 3;
    const hp    = calcHP(this.choices.class, freeBoostScores.CON, level, this.choices.ancestry);

    this._text(22, 490, `Projected HP at Level ${level}: ${hp}`, {
      fontFamily: 'monospace', fontSize: '12px', color: '#c8a84b',
    });
    this._text(22, 508, `Use + / = to boost  •  - to remove  •  ENTER when done`, {
      fontFamily: 'monospace', fontSize: '10px', color: '#3a3a3a',
    });
  }

  _computeScore(baseScores, ab) {
    let s = baseScores[ab];
    for (let i = 0; i < this.abilityFreeBoosts[ab]; i++) s = applyBoost(s);
    return s;
  }

  _abilitySourceStr(ab) {
    const anc = ANCESTRIES.find(a => a.name === this.choices.ancestry);
    const bg  = BACKGROUNDS.find(b => b.name === this.choices.background);
    const cls = CLASSES.find(c => c.name === this.choices.class);
    const parts = [];

    if (anc.abilityFlaw === ab)                            parts.push('Ancestry Flaw');
    if (anc.abilityBoosts.includes(ab))                   parts.push('Ancestry Boost');
    if (bg.abilityBoosts[0] === ab)                       parts.push('Background Boost');
    if (cls.keyAbility[0] === ab)                         parts.push('Class Boost');

    return parts.length ? `Source: ${parts.join(', ')}` : '';
  }

  // ─── Step 6: Portrait & Name ──────────────────────────────────────────────

  _renderPortrait() {
    this._drawChrome('NAME YOUR CHARACTER');

    // Left panel — portrait grid (4×2)
    this._text(20, 56, 'PORTRAIT', {
      fontFamily: 'monospace', fontSize: '11px', color: '#c8a84b', letterSpacing: 3,
    });

    for (let i = 0; i < 8; i++) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const px  = 22 + col * 72;
      const py  = 74 + row * 96;
      const pc  = PORTRAIT_COLORS[i];

      const g = this._gfx();
      g.fillStyle(pc, 1);
      g.fillRect(px, py, 60, 80);

      // Silhouette
      g.fillStyle(0x000000, 0.4);
      g.fillCircle(px + 30, py + 24, 14);
      g.fillRect(px + 18, py + 36, 24, 34);

      if (i === this.choices.portrait) {
        g.lineStyle(2, 0xe8d48b, 1);
        g.strokeRect(px - 2, py - 2, 64, 84);
      } else {
        g.lineStyle(1, 0x3a2a0a, 0.6);
        g.strokeRect(px, py, 60, 80);
      }

      this._text(px + 30, py + 83, String(i + 1), {
        fontFamily: 'monospace', fontSize: '10px', color: i === this.choices.portrait ? '#e8d48b' : '#3a3a3a',
      }).setOrigin(0.5, 0);
    }

    // Right panel — portrait(0), name(1), confirm(2), back(3)
    const rows = [
      { label: 'PORTRAIT', hint: '← → to cycle',           idx: 0 },
      { label: 'NAME',     hint: 'Type to enter name',      idx: 1 },
      { label: 'CONFIRM',  hint: 'Press ENTER to confirm',  idx: 2 },
      { label: 'BACK',     hint: 'Return to previous step', idx: 3 },
    ];

    rows.forEach(row => {
      const ry     = 68 + row.idx * 80;
      const active = this.step6Row === row.idx;
      const border = this._gfx();

      if (active) {
        border.fillStyle(0x1a0f00, 0.8);
        border.fillRect(336, ry - 6, 452, 58);
        border.lineStyle(1, 0xc8a84b, 0.6);
        border.strokeRect(336, ry - 6, 452, 58);
      }

      this._text(342, ry, row.label, {
        fontFamily: 'monospace', fontSize: '10px', color: '#5a4a2a', letterSpacing: 2,
      });

      let valueText  = '';
      let valueColor = active ? '#e8d48b' : '#8a7a5a';

      if (row.idx === 0) {
        valueText  = `Portrait ${this.choices.portrait + 1}  ←→ to cycle`;
        valueColor = active ? '#e8d48b' : '#6a5a3a';
      } else if (row.idx === 1) {
        valueText = (this.choices.name || '') + (active ? '_' : '');
        if (!this.choices.name && !active) valueText = '(enter name)';
      } else if (row.idx === 2) {
        valueText  = '► CONFIRM CHARACTER';
        valueColor = active ? '#e8d48b' : '#c8a84b';
      } else if (row.idx === 3) {
        valueText  = '  BACK';
        valueColor = active ? '#e8d48b' : '#5a4a2a';
      }

      this._text(342, ry + 18, valueText, {
        fontFamily: 'monospace', fontSize: row.idx === 2 ? '14px' : '12px', color: valueColor,
        wordWrap: { width: 440 },
      });

      if (active && row.idx < 2) {
        this._text(342, ry + 40, row.hint, {
          fontFamily: 'monospace', fontSize: '9px', color: '#3a3a3a',
        });
      }
    });
  }

  // ─── Keyboard routing ─────────────────────────────────────────────────────

  _onKey(event) {
    if (this.step <= 4) {
      this._handleMenuKey(event);
    } else if (this.step === 5) {
      this._handleAbilityKey(event);
    } else if (this.step === 6) {
      this._handleStep6Key(event);
    }
  }

  _handleMenuKey(event) {
    const key = event.key;
    let maxItems;
    switch (this.step) {
      case 1: maxItems = ANCESTRIES.length;   break;
      case 2: maxItems = ANCESTRIES.find(a => a.name === this.choices.ancestry).heritages.length; break;
      case 3: maxItems = BACKGROUNDS.length;  break;
      case 4: maxItems = CLASSES.length;      break;
    }

    if (key === 'ArrowUp') {
      this.cursor = Math.max(0, this.cursor - 1);
      if (this.cursor < this.menuScrollOffset) this.menuScrollOffset = this.cursor;
      this._renderStep();
    } else if (key === 'ArrowDown') {
      this.cursor = Math.min(maxItems - 1, this.cursor + 1);
      if (this.cursor >= this.menuScrollOffset + 16) this.menuScrollOffset = this.cursor - 15;
      this._renderStep();
    } else if (key === 'Enter') {
      this._confirmSelection();
    } else if (key === 'Escape' || key === 'Backspace') {
      this._goBack();
    }
  }

  _confirmSelection() {
    switch (this.step) {
      case 1:
        this.choices.ancestry = ANCESTRIES[this.cursor].name;
        this.cursor = 0; this.menuScrollOffset = 0;
        this.step = 2;
        this._renderStep();
        break;
      case 2:
        this.choices.heritage = ANCESTRIES.find(a => a.name === this.choices.ancestry).heritages[this.cursor].name;
        this.cursor = 0; this.menuScrollOffset = 0;
        this.step = 3;
        this._renderStep();
        break;
      case 3:
        this.choices.background = BACKGROUNDS[this.cursor].name;
        this.cursor = 0; this.menuScrollOffset = 0;
        this.step = 4;
        this._renderStep();
        break;
      case 4:
        this.choices.class = CLASSES[this.cursor].name;
        this.cursor = 0; this.menuScrollOffset = 0;
        this.abilityFreeBoosts = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
        this.abilityCursor = 0;
        this.step = 5;
        this._renderStep();
        break;
    }
  }

  _handleAbilityKey(event) {
    const key = event.key;
    const ab  = ABILITY_NAMES[this.abilityCursor];
    const total = Object.values(this.abilityFreeBoosts).reduce((a, b) => a + b, 0);

    if (key === 'ArrowUp') {
      this.abilityCursor = (this.abilityCursor - 1 + ABILITY_NAMES.length) % ABILITY_NAMES.length;
    } else if (key === 'ArrowDown') {
      this.abilityCursor = (this.abilityCursor + 1) % ABILITY_NAMES.length;
    } else if (key === '+' || key === '=' || key === 'ArrowRight') {
      if (total < 4) this.abilityFreeBoosts[ab]++;
    } else if (key === '-' || key === 'ArrowLeft') {
      if (this.abilityFreeBoosts[ab] > 0) this.abilityFreeBoosts[ab]--;
    } else if (key === 'Enter') {
      this.step6Row = 0;
      this.step = 6;
    } else if (key === 'Escape') {
      this._goBack();
      return;
    }
    this._renderStep();
  }

  _handleStep6Key(event) {
    const key    = event.key;
    const isText = !event.ctrlKey && !event.metaKey && !event.altKey;
    const maxRow = 3; // portrait=0,name=1,confirm=2,back=3

    // Text capture for name row
    if (this.step6Row === 1) {
      if (key === 'Backspace') {
        this.choices.name = this.choices.name.slice(0, -1);
        this._renderStep(); return;
      }
      if (key === 'Enter') { this.step6Row = 2; this._renderStep(); return; }
      if (isText && key.length === 1 && this.choices.name.length < 20) {
        this.choices.name += key.toUpperCase();
        this._renderStep(); return;
      }
    }

    // Navigation
    if (key === 'ArrowUp') {
      this.step6Row = Math.max(0, this.step6Row - 1);
    } else if (key === 'ArrowDown') {
      this.step6Row = Math.min(maxRow, this.step6Row + 1);
    } else if (key === 'Tab') {
      event.preventDefault && event.preventDefault();
      this.step6Row = (this.step6Row + 1) % (maxRow + 1);
    } else if (key === 'ArrowLeft') {
      if (this.step6Row === 0) this.choices.portrait = (this.choices.portrait - 1 + 8) % 8;
    } else if (key === 'ArrowRight') {
      if (this.step6Row === 0) this.choices.portrait = (this.choices.portrait + 1) % 8;
    } else if (key === 'Enter') {
      if (this.step6Row === 2) { this._confirmCharacter(); return; }
      if (this.step6Row === 3) { this._goBack();           return; }
      this.step6Row = Math.min(maxRow, this.step6Row + 1);
    } else if (key === 'Escape') {
      this._goBack(); return;
    }

    this._renderStep();
  }

  // ─── Confirm & save ───────────────────────────────────────────────────────

  _confirmCharacter() {
    if (!this.choices.name.trim()) {
      // Flash the name row
      this.step6Row = 1;
      this._renderStep();
      return;
    }

    const ancestry   = ANCESTRIES.find(a => a.name === this.choices.ancestry);
    const background = BACKGROUNDS.find(b => b.name === this.choices.background);
    const cls        = CLASSES.find(c => c.name === this.choices.class);

    const abilities = calcFinalAbilities(
      this.choices.ancestry, this.choices.background, this.choices.class, this.abilityFreeBoosts
    );

    const level = 3;
    const hp    = calcHP(this.choices.class, abilities.CON, level, this.choices.ancestry);

    const character = {
      id:        CharacterVault.generateId(),
      name:      this.choices.name.trim(),
      ancestry:  this.choices.ancestry,
      heritage:  this.choices.heritage,
      background:this.choices.background,
      class:     this.choices.class,
      abilities,
      skills:    [...background.skills],
      hp,
      portrait:  this.choices.portrait,
      level,
      section:   1,
      createdAt: Date.now(),
    };

    CharacterVault.save(character);
    this.scene.start('CharacterVault');
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  _goBack() {
    if (this.step === 1) {
      this.scene.start('CharacterVault');
    } else {
      this.step--;
      this.cursor = 0;
      this.menuScrollOffset = 0;
      this._renderStep();
    }
  }
}
