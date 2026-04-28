class CampaignSave {
  static get _KEY() { return 'stonewatch_campaign'; }

  static _default() {
    return {
      currentSection: 1,
      section1: { party: [], unlocked: true,  worldState: {} },
      section2: { party: [], unlocked: false, worldState: {} },
    };
  }

  static _load() {
    try {
      return JSON.parse(localStorage.getItem(CampaignSave._KEY)) || CampaignSave._default();
    } catch { return CampaignSave._default(); }
  }

  static _persist(data) {
    localStorage.setItem(CampaignSave._KEY, JSON.stringify(data));
  }

  static hasSave() {
    return localStorage.getItem(CampaignSave._KEY) !== null;
  }

  static getSection1Party() {
    return CampaignSave._load().section1.party;
  }

  static getSection2Party() {
    return CampaignSave._load().section2.party;
  }

  static setParty(section, partyIds) {
    const data = CampaignSave._load();
    data[`section${section}`].party = partyIds.slice(0, 6);
    CampaignSave._persist(data);
  }

  static getCurrentSection() {
    return CampaignSave._load().currentSection;
  }

  static unlockSection2() {
    const data = CampaignSave._load();
    data.section2.unlocked = true;
    CampaignSave._persist(data);
  }

  // Ensure a campaign save record exists (creates default if missing)
  static initialize() {
    if (!CampaignSave.hasSave()) {
      CampaignSave._persist(CampaignSave._default());
    }
  }
}
