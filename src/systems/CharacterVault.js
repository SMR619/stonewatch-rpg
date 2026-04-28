class CharacterVault {
  static get _KEY() { return 'stonewatch_character_vault'; }

  static getAll() {
    try {
      return JSON.parse(localStorage.getItem(CharacterVault._KEY)) || [];
    } catch { return []; }
  }

  static save(character) {
    const chars = CharacterVault.getAll();
    const idx = chars.findIndex(c => c.id === character.id);
    if (idx >= 0) chars[idx] = character;
    else chars.push(character);
    localStorage.setItem(CharacterVault._KEY, JSON.stringify(chars));
  }

  static delete(id) {
    const chars = CharacterVault.getAll().filter(c => c.id !== id);
    localStorage.setItem(CharacterVault._KEY, JSON.stringify(chars));
  }

  static get(id) {
    return CharacterVault.getAll().find(c => c.id === id) || null;
  }

  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
}
