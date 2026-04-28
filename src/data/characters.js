// PF2E Remastered game data for Echoes of Stonewatch Keep

const ANCESTRIES = [
  {
    name: 'Human',
    description: 'Adaptable and ambitious, humans are the most widespread ancestry in the Greyfang Reach. Their versatility is their greatest strength — no other people match the breadth of human ambition.',
    hp: 8,
    abilityBoosts: ['free', 'free'],
    abilityFlaw: null,
    heritages: [
      { name: 'Skilled Heritage',   description: 'Your ingenuity grants you training in one additional skill of your choice at character creation.' },
      { name: 'Versatile Heritage', description: 'Humanity\'s adaptability manifests as a general feat of your choice — broadening what you can do from day one.' },
      { name: 'Half-Elf Heritage',  description: 'One of your parents was elven. You gain low-light vision and the elf trait, opening elven feats to you.' },
      { name: 'Half-Orc Heritage',  description: 'One of your parents was orcish. You gain low-light vision and the orc trait, opening orc feats to you.' },
    ],
  },
  {
    name: 'Elf',
    description: 'Long-lived and graceful, elves carry the weight of centuries. Their natural affinity for magic and keen senses make them formidable spellcasters and scouts — though their slight frames leave them more fragile than other races.',
    hp: 6,
    abilityBoosts: ['DEX', 'INT'],
    abilityFlaw: 'CON',
    heritages: [
      { name: 'Ancient Elf',   description: 'Your long life has given you time to study many disciplines. You gain a multiclass archetype dedication feat at 1st level.' },
      { name: 'Arctic Elf',    description: 'You developed in the frozen north. You gain cold resistance equal to half your level (minimum 1).' },
      { name: 'Cavern Elf',    description: 'Your ancestors lived underground for generations. You gain darkvision instead of low-light vision.' },
      { name: 'Seer Elf',      description: 'Your elven heritage sharpens your arcane sight. You can cast Detect Magic as an innate cantrip at will.' },
    ],
  },
  {
    name: 'Dwarf',
    description: 'Hardy and resolute, dwarves are children of the mountain. Their resilience in battle and attunement to stone and metal have shaped civilizations for millennia. A dwarven grudge lasts forever — and so does their loyalty.',
    hp: 10,
    abilityBoosts: ['CON', 'WIS'],
    abilityFlaw: 'CHA',
    heritages: [
      { name: 'Ancient-Blooded Dwarf', description: 'Your ancestors stood against the ancient hordes. You gain +1 circumstance bonus to saves against magic.' },
      { name: 'Death Warden Dwarf',    description: 'Raised among those who battle undead, you gain +1 circumstance bonus to saves against death and negative effects.' },
      { name: 'Forge Dwarf',           description: 'Your heart burns with an inner fire. You gain fire resistance equal to half your level (minimum 1).' },
      { name: 'Strong-Blooded Dwarf',  description: 'Your blood fights off poison with unusual vigor. Reduce the duration of poison afflictions by 1 round.' },
    ],
  },
  {
    name: 'Halfling',
    description: 'Small in stature but fierce in spirit, halflings navigate the world with uncanny luck and surprising tenacity. Their nimble frames and sharp senses make them exceptional scouts and rogues.',
    hp: 6,
    abilityBoosts: ['DEX', 'WIS'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Gutsy Halfling',    description: 'Your uncommon bravery is legendary even among halflings. You gain +1 to saves vs. emotion and fear effects.' },
      { name: 'Hillock Halfling',  description: 'Nourishment drawn from sleeping among friendly hills heals you 1 additional HP per level when resting.' },
      { name: 'Nomadic Halfling',  description: 'A life on the road taught you many tongues. You know two additional common languages of your choice.' },
      { name: 'Twilight Halfling', description: 'Your ancestors adapted to life in dim light and shadowed places. You gain low-light vision.' },
    ],
  },
  {
    name: 'Gnome',
    description: 'Fey-touched and curious, gnomes view the world as an endless source of wonder. Their connection to primal magic makes them excellent sorcerers and inventors. Boredom is their greatest enemy.',
    hp: 8,
    abilityBoosts: ['CON', 'CHA'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Chameleon Gnome',   description: 'Your skin and hair shift color to reflect your emotional state. You can change their pigment at will as a free action.' },
      { name: 'Fey-Touched Gnome', description: 'The fey realm sings in your blood. You can cast Faerie Fire as an innate 1st-level spell once per day (CHA-based).' },
      { name: 'Sensate Gnome',     description: 'Your senses are preternaturally sharp. You gain a +1 circumstance bonus to Perception checks.' },
      { name: 'Umbral Gnome',      description: 'Darkness holds no secrets from you. You gain darkvision, seeing perfectly in complete darkness.' },
    ],
  },
];

const BACKGROUNDS = [
  {
    name: 'Soldier',
    description: 'You fought in an army, a mercenary company, or some other martial force. Discipline, endurance, and the art of war are your foundations.',
    abilityBoosts: ['STR', 'CON'],
    skills: ['Athletics', 'Warfare Lore'],
  },
  {
    name: 'Scholar',
    description: 'You spent years in libraries and lecture halls, learning from masters of knowledge. Your scholarly training opened doors to arcane, divine, or natural secrets.',
    abilityBoosts: ['INT', 'WIS'],
    skills: ['Academia Lore', 'Arcana'],
  },
  {
    name: 'Criminal',
    description: 'You operated outside the law — whether as a thief, smuggler, or fence. The streets taught you to move unseen and think three steps ahead.',
    abilityBoosts: ['DEX', 'INT'],
    skills: ['Stealth', 'Underworld Lore'],
  },
  {
    name: 'Merchant',
    description: 'Commerce was your schoolroom. You learned to read people, negotiate deals, and move goods across borders. Gold flows where you walk.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Diplomacy', 'Mercantile Lore'],
  },
  {
    name: 'Acolyte',
    description: 'You devoted your early years to a religious institution. Scripture, ritual, and devotion shaped your understanding of the world and your place in it.',
    abilityBoosts: ['INT', 'WIS'],
    skills: ['Religion', 'Scribing Lore'],
  },
  {
    name: 'Farmhand',
    description: 'You worked the land from dawn to dusk. Seasons taught you patience, and hauling loads built a body capable of enduring what others cannot.',
    abilityBoosts: ['CON', 'WIS'],
    skills: ['Athletics', 'Farming Lore'],
  },
  {
    name: 'Hunter',
    description: 'Forests and wilds were your home. You tracked prey through dense undergrowth and learned to read the land like others read books.',
    abilityBoosts: ['DEX', 'WIS'],
    skills: ['Survival', 'Hunting Lore'],
  },
  {
    name: 'Noble',
    description: 'You were raised in a house of influence and privilege. Etiquette, politics, and lineage were your earliest lessons. People grant you deference — and envy.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Society', 'Genealogy Lore'],
  },
];

const CLASSES = [
  {
    name: 'Fighter',
    description: 'Masters of martial combat, fighters excel at every form of armed battle. Their training is unparalleled — they attack more often, hit harder, and are the last ones standing.',
    hp: 10,
    keyAbility: ['STR', 'DEX'],
    startingProficiencies: ['All armor', 'Shields', 'All simple & martial weapons'],
    special: 'Attack of Opportunity — react to trigger enemy actions with a melee Strike at no action cost.',
  },
  {
    name: 'Rogue',
    description: 'Cunning, fast, and deadly in the right situation. Rogues exploit openings, deal devastating Sneak Attacks, and move through shadows as if born to darkness.',
    hp: 8,
    keyAbility: ['DEX'],
    startingProficiencies: ['Light armor', 'Simple weapons', 'Rapier', 'Shortbow', 'Sap'],
    special: 'Sneak Attack — deal +1d6 bonus damage when your target is flat-footed or you have flanking.',
  },
  {
    name: 'Cleric',
    description: 'Divine power flows through clerics, granted by gods or cosmic forces. They can heal allies, smite enemies, and channel raw divine energy. Two doctrines define their path.',
    hp: 8,
    keyAbility: ['WIS'],
    startingProficiencies: ['Light armor', 'Simple weapons', 'Deity\'s favored weapon'],
    special: 'Divine Font — channel energy to heal or harm. Starts with 2 extra divine spell slots per day.',
  },
  {
    name: 'Wizard',
    description: 'Through years of study, wizards master the theory of magic and record spells in a personal spellbook. Fragile but devastatingly powerful, they reshape reality with words of power.',
    hp: 6,
    keyAbility: ['INT'],
    startingProficiencies: ['No armor', 'Club', 'Crossbow', 'Dagger', 'Quarterstaff'],
    special: 'Spellbook — prepare spells from your personal tome each morning. Starts with 2 arcane spell slots.',
  },
];

const ABILITY_NAMES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

const ABILITY_LABELS = {
  STR: 'Strength',
  DEX: 'Dexterity',
  CON: 'Constitution',
  INT: 'Intelligence',
  WIS: 'Wisdom',
  CHA: 'Charisma',
};

// 8 distinct portrait color palettes (bg color, used for placeholder art)
const PORTRAIT_COLORS = [
  0x6b3a2a, // warm brown
  0x2a4a6b, // steel blue
  0x2a6b3a, // forest green
  0x6b2a2a, // crimson
  0x4a2a6b, // deep purple
  0x6b5a2a, // brass
  0x2a5a5a, // teal
  0x5a6b2a, // olive
];

function calcModifier(score) {
  return Math.floor((score - 10) / 2);
}

// PF2E boost rule: +2, but only +1 if already at 18+
function applyBoost(score) {
  return score >= 18 ? score + 1 : score + 2;
}

// Compute base ability scores from ancestry + background (first boost) + class key (first)
// freeBoostCounts: { STR: n, DEX: n, ... } — additional free boosts
function calcFinalAbilities(ancestryName, backgroundName, className, freeBoostCounts) {
  const ancestry = ANCESTRIES.find(a => a.name === ancestryName);
  const background = BACKGROUNDS.find(b => b.name === backgroundName);
  const cls = CLASSES.find(c => c.name === className);

  let s = { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 };

  // Ancestry flaw first, then boosts
  if (ancestry.abilityFlaw) s[ancestry.abilityFlaw] -= 2;
  ancestry.abilityBoosts.forEach(ab => {
    if (ab !== 'free') s[ab] = applyBoost(s[ab]);
  });

  // Background (take first option)
  s[background.abilityBoosts[0]] = applyBoost(s[background.abilityBoosts[0]]);

  // Class key ability (take first option)
  s[cls.keyAbility[0]] = applyBoost(s[cls.keyAbility[0]]);

  // Free boosts
  ABILITY_NAMES.forEach(ab => {
    for (let i = 0; i < (freeBoostCounts[ab] || 0); i++) {
      s[ab] = applyBoost(s[ab]);
    }
  });

  return s;
}

// Compute base scores WITHOUT free boosts (for display during step 5)
function calcBaseAbilities(ancestryName, backgroundName, className) {
  const zero = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
  return calcFinalAbilities(ancestryName, backgroundName, className, zero);
}

function calcHP(className, conScore, level, ancestryName) {
  const cls = CLASSES.find(c => c.name === className);
  const ancestry = ANCESTRIES.find(a => a.name === ancestryName);
  return ancestry.hp + (cls.hp + calcModifier(conScore)) * level;
}
