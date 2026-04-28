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
      { name: 'Half-Elf Heritage',  description: 'One of your parents was elven. You gain low-light vision and the elf trait, opening elven ancestry feats to you.' },
      { name: 'Half-Orc Heritage',  description: 'One of your parents was orcish. You gain low-light vision and the orc trait, opening orc ancestry feats to you.' },
    ],
  },
  {
    name: 'Elf',
    description: 'Long-lived and graceful, elves carry the weight of centuries. Their natural affinity for magic and keen senses make them formidable spellcasters and scouts — though their slight frames leave them more fragile than most.',
    hp: 6,
    abilityBoosts: ['DEX', 'INT'],
    abilityFlaw: 'CON',
    heritages: [
      { name: 'Ancient Elf',  description: 'Your long life has given you time to study many disciplines. You gain a multiclass archetype dedication feat at 1st level.' },
      { name: 'Arctic Elf',   description: 'You developed in the frozen north. You gain cold resistance equal to half your level (minimum 1).' },
      { name: 'Cavern Elf',   description: 'Your ancestors lived underground for generations. You gain darkvision instead of low-light vision.' },
      { name: 'Seer Elf',     description: 'Your elven heritage sharpens your arcane sight. You can cast Detect Magic as an innate cantrip at will.' },
    ],
  },
  {
    name: 'Dwarf',
    description: 'Hardy and resolute, dwarves are children of the mountain. Their resilience in battle and attunement to stone and metal have shaped civilizations for millennia. A dwarven grudge lasts forever — and so does their loyalty.',
    hp: 10,
    abilityBoosts: ['CON', 'WIS'],
    abilityFlaw: 'CHA',
    heritages: [
      { name: 'Ancient-Blooded Dwarf', description: 'Your ancestors stood against ancient magical hordes. You gain a +1 circumstance bonus to saves against magic.' },
      { name: 'Death Warden Dwarf',    description: 'Raised among those who battle undead, you gain a +1 circumstance bonus to saves against death and negative effects.' },
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
      { name: 'Gutsy Halfling',    description: 'Your uncommon bravery is legendary even among halflings. You gain a +1 circumstance bonus to saves against emotion and fear effects.' },
      { name: 'Hillock Halfling',  description: 'Nourishment from sleeping among friendly hills is restorative. You heal 1 additional HP per level when resting.' },
      { name: 'Nomadic Halfling',  description: 'A life on the road taught you many tongues. You know two additional common languages of your choice.' },
      { name: 'Twilight Halfling', description: 'Your ancestors adapted to dim light and shadowed places. You gain low-light vision.' },
    ],
  },
  {
    name: 'Gnome',
    description: 'Fey-touched and curious, gnomes view the world as an endless source of wonder. Their connection to primal magic makes them excellent sorcerers and tinkerers. Boredom is their greatest enemy — a gnome who stops marveling begins to wither.',
    hp: 8,
    abilityBoosts: ['CON', 'CHA'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Chameleon Gnome',   description: 'Your skin and hair shift color to reflect your emotional state. You can change their pigment at will as a free action.' },
      { name: 'Fey-Touched Gnome', description: 'The fey realm sings in your blood. You can cast Faerie Fire as an innate 1st-level spell once per day (CHA-based).' },
      { name: 'Sensate Gnome',     description: 'Your senses are preternaturally sharp. You gain a +1 circumstance bonus to all Perception checks.' },
      { name: 'Umbral Gnome',      description: 'Darkness holds no secrets from you. You gain darkvision, seeing perfectly in complete darkness.' },
    ],
  },
  {
    name: 'Goblin',
    description: 'Scrappy and feral, goblins have clawed their way into civilized society on sheer audacity alone. What they lack in size they make up for in sheer unpredictability — and a terrifying love of burning things.',
    hp: 6,
    abilityBoosts: ['DEX', 'CHA'],
    abilityFlaw: 'WIS',
    heritages: [
      { name: 'Charhide Goblin',   description: 'Your ancestors worked alongside fire for generations. You gain fire resistance equal to half your level (minimum 1).' },
      { name: 'Irongut Goblin',    description: 'Your stomach can handle nearly anything. You gain a +2 circumstance bonus to saves against the sickened condition.' },
      { name: 'Razortooth Goblin', description: 'You were born with formidable teeth. You gain a jaw unarmed attack that deals 1d6 piercing damage.' },
      { name: 'Snow Goblin',       description: 'Your tribe survived in brutal frozen wastes. You gain cold resistance equal to half your level (minimum 1).' },
    ],
  },
  {
    name: 'Leshy',
    description: 'Born from animating spirits of nature given plant form, leshies are gentle guardians of wild places. They blend compassion with primal toughness, and their connection to the natural world runs deeper than any druid\'s training.',
    hp: 8,
    abilityBoosts: ['CON', 'WIS'],
    abilityFlaw: 'INT',
    heritages: [
      { name: 'Fungus Leshy', description: 'Your body teems with spores. You gain darkvision and immunity to inhaled afflictions.' },
      { name: 'Gourd Leshy',  description: 'Your hollow head can store a tiny creature or object inside your skull cavity.' },
      { name: 'Leaf Leshy',   description: 'Broad leaves line your form. You gain a +1 circumstance bonus to saves vs. fire and glide safely when falling.' },
      { name: 'Vine Leshy',   description: 'Clinging vines shape your body. You can use Athletics to Climb even on slick surfaces without additional equipment.' },
    ],
  },
  {
    name: 'Orc',
    description: 'Powerful and driven, orcs carry an ancient legacy of conquest that they\'ve learned to channel into relentless pursuit of excellence. Their fearsome physiques conceal sharp minds and unwavering determination.',
    hp: 10,
    abilityBoosts: ['STR', 'free'],
    abilityFlaw: null,
    heritages: [
      { name: 'Badlands Orc',     description: 'You were forged in arid wastelands. Heat and drought don\'t impair you, and you gain a +2 circumstance bonus to saves against dehydration.' },
      { name: 'Deep Orc',         description: 'Your ancestors lurked in subterranean tunnels. You gain darkvision and the Intimidating Glare ancestry feat.' },
      { name: 'Hold-Scarred Orc', description: 'A life of brutal warfare has thickened your hide. You gain +2 maximum HP for each orc ancestry feat you take.' },
      { name: 'Rainfall Orc',     description: 'You hail from storm-lashed coastlands. You gain cold resistance equal to half your level (minimum 1) and feel at home in rain and fog.' },
    ],
  },
  {
    name: 'Catfolk',
    description: 'Called amurrun in their own tongue, catfolk are graceful wanderers who follow curiosity across continents. Quick-reflexed and socially adept, they move through the world with feline confidence — never quite where you expect them to be.',
    hp: 8,
    abilityBoosts: ['DEX', 'CHA'],
    abilityFlaw: 'WIS',
    heritages: [
      { name: 'Clawed Catfolk',   description: 'Your claws are unusually sharp. You gain a claw unarmed attack that deals 1d6 slashing damage.' },
      { name: 'Flexible Catfolk', description: 'Your joints are supple as water. Difficult terrain caused by rubble or undergrowth doesn\'t slow your movement.' },
      { name: 'Jungle Catfolk',   description: 'Your ancestors swam tropical rivers. You gain a swim speed of 15 feet.' },
      { name: 'Liminal Catfolk',  description: 'Your senses brush the spirit world. You can detect the presence of spirits and haunts within 30 feet.' },
    ],
  },
  {
    name: 'Tengu',
    description: 'Avian humanoids with razor-sharp minds and a passion for collecting blades and stories, tengu are drawn to adventure by an insatiable hunger for experience. Their crow-like features belie a fierce pride and a talent for mimicry that borders on uncanny.',
    hp: 6,
    abilityBoosts: ['DEX', 'free'],
    abilityFlaw: null,
    heritages: [
      { name: 'Dogtooth Tengu',       description: 'Your beak is larger and more powerful than most. Your beak unarmed attack deals 1d10 piercing damage instead of 1d4.' },
      { name: 'Jinxed Tengu',         description: 'Ill fortune slides off you. You gain a +1 circumstance bonus to saves against curses and bad luck effects.' },
      { name: 'Mountainkeeper Tengu', description: 'You commune with mountain spirits. You can cast Commune with Nature as an innate ritual once per week.' },
      { name: 'Skyborn Tengu',        description: 'Your wings are unusually strong. You can Fly up to 15 feet per action but must land at the end of your turn.' },
    ],
  },
  {
    name: 'Lizardfolk',
    description: 'Patient, deliberate, and startlingly wise, iruxi have built enduring civilizations beneath their calm exteriors. They read weather and intention with equal ease, and their scaled bodies are built for both land and water.',
    hp: 8,
    abilityBoosts: ['STR', 'WIS'],
    abilityFlaw: 'INT',
    heritages: [
      { name: 'Cliffscale Lizardfolk',  description: 'Your powerful limbs cling to sheer surfaces. You gain a climb speed of 25 feet.' },
      { name: 'Frilled Lizardfolk',     description: 'Your neck frills flare dramatically when threatened. You gain a +1 circumstance bonus to Intimidation checks.' },
      { name: 'Sandstrider Lizardfolk', description: 'Harsh desert bred unshakeable endurance. Extreme heat doesn\'t impair you, and you gain a +2 circumstance bonus to saves against fire.' },
      { name: 'Wetlander Lizardfolk',   description: 'Your ancestry is aquatic. You gain a swim speed of 25 feet.' },
    ],
  },
  {
    name: 'Kobold',
    description: 'Small and cunning, kobolds have survived by wit rather than strength, carving elaborate warrens and mastering traps that confound creatures ten times their size. Their draconic heritage grants them a touch of ancient power.',
    hp: 6,
    abilityBoosts: ['DEX', 'CHA'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Cavern Kobold',      description: 'Your eyes were made for lightless tunnels. You gain darkvision and a +1 circumstance bonus to Stealth in caves.' },
      { name: 'Dragonscaled Kobold',description: 'Your scales carry the power of your draconic patron. Choose acid, cold, electricity, fire, or poison — you gain resistance equal to half your level.' },
      { name: 'Spellscale Kobold',  description: 'Draconic magic flows through your scales. You can cast one cantrip innately from your dragon\'s associated tradition.' },
      { name: 'Strongjaw Kobold',   description: 'Your jaws are deceptively powerful. You gain a jaw unarmed attack that deals 1d6 piercing damage.' },
    ],
  },
  {
    name: 'Ratfolk',
    description: 'Called ysoki by their own kind, ratfolk are ingenious and gregarious, forming tight-knit trading communities wherever they settle. Quick and clever, they survive through cooperation, adaptability, and an unerring instinct for knowing when to run.',
    hp: 6,
    abilityBoosts: ['DEX', 'INT'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Deep Rat',      description: 'Your ancestors lurked in lightless warrens. You gain darkvision and a +1 circumstance bonus to Stealth when underground.' },
      { name: 'Desert Rat',    description: 'Arid wastes shaped your lineage. You gain fire resistance equal to half your level (minimum 1) and require water less frequently.' },
      { name: 'Longsnout Rat', description: 'Your nose is extraordinary. You gain a +2 circumstance bonus to Perception to smell and to Survival checks to track by scent.' },
      { name: 'Sewer Rat',     description: 'You\'re immune to ordinary diseases and gain a +1 circumstance bonus to saves against all disease effects.' },
    ],
  },
  {
    name: 'Fetchling',
    description: 'Descendants of humans stranded in the Shadow Plane, fetchlings carry an eerie stillness and a natural affinity for darkness. Their detached manner masks a fierce adaptability that has kept their line alive for generations.',
    hp: 8,
    abilityBoosts: ['DEX', 'free'],
    abilityFlaw: null,
    heritages: [
      { name: 'Bright Fetchling',   description: 'Contrary to your kin, you radiate a subtle inner light. You can create dim light in a 10-foot radius and are never dazzled.' },
      { name: 'Liminal Fetchling',  description: 'Your shadow-touched senses pierce magical concealment. You can cast Detect Magic once per day as an innate spell.' },
      { name: 'Resolute Fetchling', description: 'The Shadow Plane hardens minds against fear. You gain a +1 circumstance bonus to saves against mental effects.' },
      { name: 'Wisp Fetchling',     description: 'Your form blurs in shadow. You gain a +1 circumstance bonus to Stealth checks in dim light or darkness.' },
    ],
  },
  {
    name: 'Fleshwarp',
    description: 'Twisted by magical experimentation or exposure to reality-warping forces, fleshwarps bear bodies that defy conventional anatomy. Their altered forms are tougher and more capable than any natural physique.',
    hp: 10,
    abilityBoosts: ['CON', 'free'],
    abilityFlaw: null,
    heritages: [
      { name: 'Irongut Fleshwarp',     description: 'Your altered digestion is shockingly resilient. Reduce the stage of poison and disease by 1 when rolling saves against them.' },
      { name: 'Longlimbed Fleshwarp',  description: 'Your limbs extend unnaturally. The reach of your unarmed attacks is 10 feet instead of 5.' },
      { name: 'Mutated Fleshwarp',     description: 'One unusual mutation provides a distinct advantage — an extra sensory organ, a prehensile tail, or similarly useful alteration.' },
      { name: 'Nightmarish Fleshwarp', description: 'Your unsettling appearance works in your favor. You gain a +1 circumstance bonus to Intimidation checks.' },
    ],
  },
  {
    name: 'Grippli',
    description: 'Tree-dwelling amphibious humanoids with enormous eyes and sticky fingers, grippli inhabit jungle canopies and wetland margins. They are patient hunters and surprisingly fierce warriors when their territory is threatened.',
    hp: 6,
    abilityBoosts: ['DEX', 'WIS'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Glider Grippli',     description: 'Webbed limbs slow your descent. You fall no more than 50 feet per round, taking no damage from falls less than 50 feet.' },
      { name: 'Poisonhide Grippli', description: 'Toxic secretions coat your skin. Anyone who grabs you takes 1d4 poison damage.' },
      { name: 'Snaptongue Grippli', description: 'Your tongue strikes with startling speed. You gain a tongue unarmed attack with 10-foot reach that deals 1d4 bludgeoning damage.' },
      { name: 'Windweb Grippli',    description: 'A connection to storm spirits grants resilience. You gain electricity resistance equal to half your level (minimum 1).' },
    ],
  },
  {
    name: 'Kitsune',
    description: 'Shapeshifting fox-folk who move between human society and the wild with equal ease, kitsune are masters of social navigation and subtle magic. Their charm is genuine — but so is the mischief beneath it.',
    hp: 8,
    abilityBoosts: ['CHA', 'free'],
    abilityFlaw: null,
    heritages: [
      { name: 'Celestial Envoy Kitsune', description: 'Blessed by celestial powers, you gain a +1 circumstance bonus to saves against evil effects and can cast Ghost Sound as an innate cantrip.' },
      { name: 'Cold Wind Kitsune',       description: 'Winter\'s breath is your ally. You can cast Gust of Wind once per day and gain cold resistance equal to half your level (minimum 1).' },
      { name: 'Earthly Wilds Kitsune',   description: 'The natural world speaks to you. You gain a +1 circumstance bonus to Nature checks and ignore forest difficult terrain.' },
      { name: 'Empty Sky Kitsune',       description: 'The wind whispers your thoughts. You can cast Message as an innate cantrip and gain +1 to Will saves against mental effects.' },
    ],
  },
  {
    name: 'Sprite',
    description: 'Tiny and effervescent, sprites burst with fey energy that manifests as wings, glamours, and an incandescent optimism that larger folk sometimes find alarming. Their small size belies the enormous trouble they can cause.',
    hp: 6,
    abilityBoosts: ['DEX', 'CHA'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Draxie',  description: 'Draconic heritage flows through your wings. Once per hour you can exhale a burst of elemental energy dealing 1d4 damage (choose type at creation).' },
      { name: 'Melixie', description: 'Honey bee kin blesses you. You gain a bee familiar option and a +1 circumstance bonus to saves against poison.' },
      { name: 'Nyktera', description: 'Bat-like senses sharpen in darkness. You gain imprecise blindsense out to 10 feet.' },
      { name: 'Pixie',   description: 'Classic pixie magic flows through you. You can cast Invisibility as an innate 2nd-level spell once per day (CHA-based).' },
    ],
  },
  {
    name: 'Strix',
    description: 'Winged humanoids who dwell in mountain aeries, strix are fierce and proud, with a warrior culture built around defending their territory. Their dark feathers and glowing eyes cut imposing figures in the sky.',
    hp: 8,
    abilityBoosts: ['DEX', 'WIS'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Dusk Strix',       description: 'Your feathers darken to near-black in shadow. You gain a +1 circumstance bonus to Stealth checks in dim light or darkness.' },
      { name: 'Nightglider Strix',description: 'Darkness doesn\'t hinder your flight. You gain darkvision and can fly without penalty in complete darkness.' },
      { name: 'Predatory Strix',  description: 'Your talons are built to seize. You gain a talon unarmed attack that deals 1d6 slashing damage.' },
      { name: 'Shoreline Strix',  description: 'Coastal clans gave you an affinity for water. You gain a swim speed of 20 feet.' },
    ],
  },
  {
    name: 'Android',
    description: 'Constructed beings of advanced technology awakened to full sentience, androids struggle to reconcile their mechanical origins with deeply felt emotions. Their synthetic bodies excel where organic ones would fail.',
    hp: 8,
    abilityBoosts: ['DEX', 'INT'],
    abilityFlaw: 'CHA',
    heritages: [
      { name: 'Artilect Android',  description: 'Your cognition module is optimized for deduction. You gain a +1 circumstance bonus to Recall Knowledge checks on all topics.' },
      { name: 'Laborer Android',   description: 'Your frame was built for sustained heavy industry. You gain a +1 circumstance bonus to Athletics checks.' },
      { name: 'Polyglot Android',  description: 'Your memory banks contain extensive linguistic data. You know two additional languages.' },
      { name: 'Warrior Android',   description: 'Combat subroutines are baked into your base firmware. You gain a +1 circumstance bonus to attack rolls made as reactions.' },
    ],
  },
  {
    name: 'Azarketi',
    description: 'Descendants of humans transformed by the aboleth masters of a drowned empire, azarketi bear gill-slits and scaled skin as marks of their aquatic heritage. They exist between land and sea, claiming both and belonging fully to neither.',
    hp: 8,
    abilityBoosts: ['CON', 'CHA'],
    abilityFlaw: 'WIS',
    heritages: [
      { name: 'Benthic Azarketi',   description: 'Your lineage adapted to crushing ocean depths. You gain darkvision and cold resistance equal to half your level (minimum 1).' },
      { name: 'Lagoon Azarketi',    description: 'Electric eel ancestry crackles in your blood. You gain a +1 bonus to saves against electricity and deal 1 electricity damage on successful grapples.' },
      { name: 'Mistbreath Azarketi',description: 'Sea mists restore you. Spending time in fog or light rain reduces the severity of disease stages during your daily preparations.' },
      { name: 'Tidal Azarketi',     description: 'Enhanced fins and tail drive you through water with ease. Your swim speed increases by 10 feet.' },
    ],
  },
  {
    name: 'Poppet',
    description: 'Animated cloth, wood, or ceramic constructs given a spark of life, poppets are small beings who face a world never designed for them with cheerful determination. Their bodies are surprisingly resilient in ways that confound expectations.',
    hp: 6,
    abilityBoosts: ['DEX', 'CHA'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Daubed Poppet',   description: 'Protective paint and lacquer coat your surface. You gain a +1 circumstance bonus to saves against disease and poison effects.' },
      { name: 'Stuffed Poppet',  description: 'Your soft padded form absorbs impact remarkably well. You take no damage from falls of 10 feet or less.' },
      { name: 'Stitched Poppet', description: 'Enchanted stitching knits your wounds. Once per day you can gain temporary HP equal to your level.' },
      { name: 'Waxwork Poppet',  description: 'Waxy exterior grants modest fire resistance. You gain fire resistance 3.' },
    ],
  },
  {
    name: 'Shoony',
    description: 'Dog-like humanoids with short muzzles and floppy ears, shoonies are gentle, community-minded folk who have suffered greatly at the hands of those who underestimated them. Their loyalty is absolute — and so is their memory for betrayal.',
    hp: 6,
    abilityBoosts: ['DEX', 'CHA'],
    abilityFlaw: 'STR',
    heritages: [
      { name: 'Bloodhound Shoony', description: 'Your nose rivals that of hounds bred for tracking. You gain a +2 circumstance bonus to Perception and Survival checks that rely on scent.' },
      { name: 'Thickcoat Shoony',  description: 'Dense winter fur insulates you against the cold. You gain cold resistance equal to half your level (minimum 1).' },
      { name: 'Tunneler Shoony',   description: 'Ancestral tunnel-diggers bless your arms. You gain a burrow speed of 10 feet through loose earth and sand.' },
      { name: 'Woolly Shoony',     description: 'Extra-thick wool repels moisture and cling. You ignore difficult terrain caused by shallow water or mud.' },
    ],
  },
  {
    name: 'Automaton',
    description: 'Ancient magical constructs built to serve long-forgotten empires, automatons have persisted through the ages, many slowly developing true consciousness over the centuries. Their metal bodies are built to endure — their minds are built to question.',
    hp: 8,
    abilityBoosts: ['STR', 'CON'],
    abilityFlaw: 'CHA',
    heritages: [
      { name: 'Annihilator Automaton',   description: 'A built-in ranged weapon is housed in one limb. You gain an unarmed ranged attack dealing 1d4 fire or electricity damage with a 30-foot range.' },
      { name: 'Beastform Automaton',     description: 'Your lower chassis takes an animal-like quadruped form. You gain a +10-foot circumstance bonus to your land speed.' },
      { name: 'Warrior Automaton',       description: 'Your chassis was designed for frontline warfare. You gain a +1 circumstance bonus to Fortitude saves.' },
      { name: 'Wonder Worker Automaton', description: 'A magical core hums inside your chest. You can cast one common cantrip of your choice as an innate spell at will (INT-based).' },
    ],
  },
  {
    name: 'Anadi',
    description: 'Reclusive spider-folk who weave both silk and illusion, anadi live in isolated communities hidden by magical disguise. They are patient, meticulous, and deeply communal — their webs, both literal and figurative, hold entire societies together.',
    hp: 8,
    abilityBoosts: ['DEX', 'WIS'],
    abilityFlaw: 'CON',
    heritages: [
      { name: 'Darkweave Anadi', description: 'Your silk can be woven to absorb light. You gain a +1 circumstance bonus to Stealth in darkness.' },
      { name: 'Groove Anadi',    description: 'Barbed legs grip surfaces with ease. You gain a +1 circumstance bonus to Athletics checks to Climb.' },
      { name: 'Spindly Anadi',   description: 'Your limbs extend unnaturally in spider form. Your melee unarmed attacks gain a 10-foot reach.' },
      { name: 'Venomous Anadi',  description: 'Potent venom flows through your fangs. Your jaw unarmed attack deals 1d6 piercing plus 1 poison damage per 2 levels.' },
    ],
  },
];

const CLASSES = [
  {
    name: 'Alchemist',
    description: 'Masters of the transformative science, alchemists brew potions, craft bombs, and concoct elixirs that bend the rules of nature. Their genius is measured in the number of things they can make explode in a controlled fashion.',
    hp: 8,
    keyAbility: ['INT'],
    startingProficiencies: ['Light armor', 'Alchemical bombs', 'Simple weapons'],
    special: 'Infused Reagents — generate free alchemical items each day using your advanced understanding of alchemy.',
  },
  {
    name: 'Barbarian',
    description: 'Channeling primal fury into overwhelming physical might, barbarians excel at sustained melee destruction. Their rage pushes bodies beyond natural limits — a barbarian who stops being angry is rarely as dangerous as one who doesn\'t.',
    hp: 12,
    keyAbility: ['STR'],
    startingProficiencies: ['Light & medium armor', 'Shields', 'Martial weapons'],
    special: 'Rage — enter a fearsome rage that grants bonus damage and temporary HP but limits spellcasting.',
  },
  {
    name: 'Bard',
    description: 'Performers who discovered that true art is a form of magic, bards weave occult power through music, poetry, and presence. Whether inspiring allies or unraveling enemy minds, a bard always knows exactly which string to pull.',
    hp: 8,
    keyAbility: ['CHA'],
    startingProficiencies: ['Light armor', 'Simple weapons', 'Longsword, rapier, sap, shortbow, shortsword, whip'],
    special: 'Muses — choose an artistic muse that defines your bardic focus and grants signature spells and features.',
  },
  {
    name: 'Champion',
    description: 'Champions serve a divine cause with absolute conviction. They are armored bulwarks for their allies and divine judgment incarnate for their enemies — which role they play depends entirely on their chosen cause.',
    hp: 10,
    keyAbility: ['STR', 'DEX'],
    startingProficiencies: ['All armor', 'Shields', 'Martial weapons'],
    special: 'Champion\'s Reaction — respond to enemy aggression with a divine reaction that protects allies or punishes foes based on your cause.',
  },
  {
    name: 'Cleric',
    description: 'Divine power flows through clerics, granted by gods or cosmic forces. They can heal allies, smite enemies, and channel raw divine energy. Two doctrines define their path — the healer and the warrior are equally valid expressions of faith.',
    hp: 8,
    keyAbility: ['WIS'],
    startingProficiencies: ['Light armor', 'Simple weapons', 'Deity\'s favored weapon'],
    special: 'Divine Font — channel divine energy to cast free healing or harmful spells each day above your normal spell slots.',
  },
  {
    name: 'Druid',
    description: 'Devoted to the living world and the forces that sustain it, druids draw power from nature\'s rawness. They shape-shift, commune with animals, summon storms, and grow thorns from stone — all in service of an ancient and demanding balance.',
    hp: 8,
    keyAbility: ['WIS'],
    startingProficiencies: ['Light & medium armor (not metal)', 'Shields', 'Simple weapons'],
    special: 'Druidic Order — join one of four orders that defines your relationship with nature and grants signature spells.',
  },
  {
    name: 'Fighter',
    description: 'Masters of martial combat, fighters excel at every form of armed battle. Their training is unparalleled — they attack more often, hit harder, and are the last ones standing when the dust settles.',
    hp: 10,
    keyAbility: ['STR', 'DEX'],
    startingProficiencies: ['All armor', 'Shields', 'All simple & martial weapons'],
    special: 'Attack of Opportunity — react to trigger enemy actions with a melee Strike at no action cost.',
  },
  {
    name: 'Gunslinger',
    description: 'Cool under fire and deadly accurate, gunslingers have mastered the roaring new technology of firearms. They fight with swagger and precision, developing signature deeds that make them as intimidating to watch as they are to face.',
    hp: 8,
    keyAbility: ['DEX'],
    startingProficiencies: ['Light & medium armor', 'Simple & martial firearms & crossbows', 'Simple melee weapons'],
    special: 'Way — choose a gunslinging way that defines your signature combat style and grants your initial deed.',
  },
  {
    name: 'Inventor',
    description: 'Brilliant tinkerers who channel ingenuity into functional — if explosive — combat machinery, inventors build and improve their signature creation as they adventure. The line between engineering and magic is one they cross casually.',
    hp: 8,
    keyAbility: ['INT'],
    startingProficiencies: ['Light & medium armor', 'Shields', 'Simple & martial weapons'],
    special: 'Innovation — design a personal invention (armor, construct, or weapon) that you can modify and improve as you level.',
  },
  {
    name: 'Investigator',
    description: 'Students of both logic and human nature, investigators deduce facts that others overlook and exploit them ruthlessly in combat. They are patient, methodical, and more dangerous when they\'ve had time to think.',
    hp: 8,
    keyAbility: ['INT'],
    startingProficiencies: ['Light armor', 'Simple weapons', 'Rapier, sap, shortbow, shortsword'],
    special: 'Devise a Stratagem — mentally map out an enemy\'s weak points to guarantee a hit once per round using Recall Knowledge.',
  },
  {
    name: 'Magus',
    description: 'Rare warriors who blend martial training with arcane power, magi pursue a demanding path that rewards those who master both disciplines. Their signature Spellstrike fuses blade and spell into a single devastating strike.',
    hp: 8,
    keyAbility: ['STR', 'DEX'],
    startingProficiencies: ['Light armor', 'Simple & martial weapons'],
    special: 'Spellstrike — combine a melee Strike with a spell in one devastating action, channeling magic through your weapon.',
  },
  {
    name: 'Monk',
    description: 'Masters of body and mind, monks have pushed the limits of unarmed combat through relentless discipline. They require no weapons, wear no armor, and need no external power — their bodies are the only instrument they will ever need.',
    hp: 10,
    keyAbility: ['STR', 'DEX'],
    startingProficiencies: ['No armor', 'Unarmed attacks', 'Simple & monk weapons'],
    special: 'Flurry of Blows — strike twice in a single action when both attacks use unarmed or monk weapons.',
  },
  {
    name: 'Oracle',
    description: 'Touched by divine power they didn\'t ask for, oracles channel enormous magical potential through a body that pays a terrible price for it. Their mysteries are potent and their curses are real — but those who embrace both become truly formidable.',
    hp: 8,
    keyAbility: ['CHA'],
    startingProficiencies: ['Light armor', 'Simple weapons'],
    special: 'Mystery — choose a divine mystery that grants powerful thematic spells while afflicting your body with a supernatural curse.',
  },
  {
    name: 'Psychic',
    description: 'Possessing raw mental power that can reshape reality through sheer will, psychics are uncommon even among spellcasters. Their power is internal and instinctive — and often more difficult to control than conventional magic.',
    hp: 6,
    keyAbility: ['INT', 'CHA'],
    startingProficiencies: ['No armor', 'Simple weapons'],
    special: 'Conscious Mind — choose a psionic archetype that focuses your mental power and defines your signature psi cantrips and amps.',
  },
  {
    name: 'Ranger',
    description: 'Hunters and trackers who have turned survival into lethality, rangers excel at pursuing and eliminating specific targets. Whether with bow or blade, they bring methodical precision to every engagement.',
    hp: 10,
    keyAbility: ['STR', 'DEX'],
    startingProficiencies: ['Light & medium armor', 'Shields', 'Simple & martial weapons'],
    special: 'Hunt Prey — designate one creature as your prey to gain tracking bonuses and unlock precision damage feats against them.',
  },
  {
    name: 'Rogue',
    description: 'Cunning, fast, and deadly in the right situation. Rogues exploit openings, deliver devastating Sneak Attacks, and move through shadows as if born to darkness. Their adaptability makes them valuable in and out of combat.',
    hp: 8,
    keyAbility: ['DEX', 'CHA'],
    startingProficiencies: ['Light armor', 'Simple weapons', 'Rapier, shortbow, sap, shortsword'],
    special: 'Sneak Attack — deal +1d6 precision damage against flat-footed targets, scaling as you level.',
  },
  {
    name: 'Sorcerer',
    description: 'Magic users whose power is innate rather than learned, sorcerers access their bloodline\'s potential with raw instinct. Their spells are fewer than a wizard\'s, but the power behind each one reflects something deeper and more primal.',
    hp: 6,
    keyAbility: ['CHA'],
    startingProficiencies: ['No armor', 'Simple weapons'],
    special: 'Bloodline — your magical power flows from a bloodline that determines your spell list, signature spells, and innate abilities.',
  },
  {
    name: 'Summoner',
    description: 'Eidolonists who forge a soul-deep bond with a powerful otherworldly entity, summoners fight alongside their eidolon in a partnership where both beings act as one. What the summoner lacks, the eidolon provides.',
    hp: 10,
    keyAbility: ['STR', 'CHA'],
    startingProficiencies: ['Light armor', 'Simple weapons'],
    special: 'Eidolon — bond with a powerful magical entity that manifests in the world and acts on your shared pool of actions.',
  },
  {
    name: 'Swashbuckler',
    description: 'Flamboyant duelists who have turned reckless flair into genuine combat discipline, swashbucklers live for the decisive moment. Their panache is more than swagger — it\'s the mechanism by which they channel daring into destruction.',
    hp: 10,
    keyAbility: ['DEX'],
    startingProficiencies: ['Light armor', 'Simple & martial weapons'],
    special: 'Panache — perform daring deeds to generate panache, then spend it on devastating finisher attacks that end encounters in style.',
  },
  {
    name: 'Thaumaturge',
    description: 'Practical occultists who fight supernatural threats using esoteric lore and magical implements, thaumaturges know what monsters fear and use it against them. Where others study magic, they study the weaknesses of everything magical.',
    hp: 8,
    keyAbility: ['CHA'],
    startingProficiencies: ['Light armor', 'Shields', 'Simple & martial weapons'],
    special: 'Implement — wield a chosen magical implement that channels your esoteric knowledge and exploits the vulnerabilities of supernatural foes.',
  },
  {
    name: 'Witch',
    description: 'Spellcasters who serve a mysterious patron in exchange for magical power delivered through a familiar, witches occupy a unique space between tradition and transgression. The source of their power is rarely the point — the results always are.',
    hp: 6,
    keyAbility: ['INT', 'CHA'],
    startingProficiencies: ['No armor', 'Simple weapons'],
    special: 'Patron — serve a mysterious magical patron who teaches you spells through your familiar in exchange for unnamed favors.',
  },
  {
    name: 'Wizard',
    description: 'Through years of rigorous study, wizards master the underlying theory of magic and record spells in a personal spellbook. Fragile but devastatingly powerful, they reshape reality with words of power accumulated over a lifetime of scholarship.',
    hp: 6,
    keyAbility: ['INT'],
    startingProficiencies: ['No armor', 'Club, crossbow, dagger, quarterstaff'],
    special: 'Spellbook — prepare spells from your personal arcane tome each morning, choosing from the largest spell list of any class.',
  },
];

const BACKGROUNDS = [
  {
    name: 'Acolyte',
    description: 'You devoted your early years to a religious institution. Scripture, ritual, and devotion shaped your understanding of the world and your place in it.',
    abilityBoosts: ['INT', 'WIS'],
    skills: ['Religion', 'Scribing Lore'],
  },
  {
    name: 'Acrobat',
    description: 'You trained in the circus, a theater troupe, or a street performance company, mastering balance and physical discipline through years of practice.',
    abilityBoosts: ['STR', 'DEX'],
    skills: ['Acrobatics', 'Circus Lore'],
  },
  {
    name: 'Animal Whisperer',
    description: 'You have an uncanny rapport with animals, having spent your youth learning to read their behavior and earn their trust through patient observation.',
    abilityBoosts: ['WIS', 'CHA'],
    skills: ['Nature', 'Animal Lore'],
  },
  {
    name: 'Artisan',
    description: 'You learned a craft in a guild or workshop, developing the patience and skill to turn raw materials into objects of lasting value.',
    abilityBoosts: ['STR', 'INT'],
    skills: ['Crafting', 'Guild Lore'],
  },
  {
    name: 'Artist',
    description: 'Creative expression was your vocation — whether painter, sculptor, or illuminator, you honed your dexterity and eye for beauty through years of dedicated work.',
    abilityBoosts: ['DEX', 'CHA'],
    skills: ['Crafting', 'Art Lore'],
  },
  {
    name: 'Barkeep',
    description: 'You ran a taproom or worked behind a bar, learning to handle difficult patrons and listen carefully to the stories people tell when their guard is down.',
    abilityBoosts: ['CON', 'CHA'],
    skills: ['Diplomacy', 'Alcohol Lore'],
  },
  {
    name: 'Barrister',
    description: 'You studied law and argued cases before magistrates, developing a sharp mind for precedent, loopholes, and the art of persuading people with words alone.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Diplomacy', 'Legal Lore'],
  },
  {
    name: 'Bounty Hunter',
    description: 'You tracked down fugitives for coin, learning to move quietly and think like the people you hunted. The law was a tool you used — not always a code you followed.',
    abilityBoosts: ['STR', 'INT'],
    skills: ['Survival', 'Legal Lore'],
  },
  {
    name: 'Charlatan',
    description: 'You ran cons, sold false cures, and played the roles people wanted to see. Every mark taught you something new about human credulity — and human greed.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Deception', 'Underworld Lore'],
  },
  {
    name: 'Criminal',
    description: 'You operated outside the law — whether as a thief, smuggler, or fence. The streets taught you to move unseen and think three steps ahead of everyone watching.',
    abilityBoosts: ['DEX', 'INT'],
    skills: ['Stealth', 'Underworld Lore'],
  },
  {
    name: 'Detective',
    description: 'You made a living solving mysteries others gave up on. Observation and deduction are your tools; the truth is your only loyalty.',
    abilityBoosts: ['INT', 'WIS'],
    skills: ['Diplomacy', 'Underworld Lore'],
  },
  {
    name: 'Emissary',
    description: 'You represented a noble, a merchant house, or a foreign power, learning the delicate art of delivering messages that carry weight without igniting war.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Society', 'City Lore'],
  },
  {
    name: 'Entertainer',
    description: 'You performed for crowds large and small — as a singer, comedian, storyteller, or actor — learning to read an audience and hold attention through sheer presence.',
    abilityBoosts: ['DEX', 'CHA'],
    skills: ['Performance', 'Theater Lore'],
  },
  {
    name: 'Farmhand',
    description: 'You worked the land from dawn to dusk. Seasons taught you patience, and hauling loads built a body capable of enduring what most adventurers complain about.',
    abilityBoosts: ['CON', 'WIS'],
    skills: ['Athletics', 'Farming Lore'],
  },
  {
    name: 'Field Medic',
    description: 'You treated wounds on battlefields and during disasters, learning to make fast decisions with inadequate supplies under life-or-death pressure.',
    abilityBoosts: ['CON', 'WIS'],
    skills: ['Medicine', 'Warfare Lore'],
  },
  {
    name: 'Fortune Teller',
    description: 'You read cards, stars, entrails, or dreams for paying customers. Whether your gift is real or performed, your instincts about people are uncannily accurate.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Occultism', 'Fortune-Telling Lore'],
  },
  {
    name: 'Gambler',
    description: 'You lived by reading odds and people, turning each game into a laboratory for understanding human behavior and exploiting it with a smile on your face.',
    abilityBoosts: ['DEX', 'CHA'],
    skills: ['Deception', 'Games Lore'],
  },
  {
    name: 'Gladiator',
    description: 'The crowd roared your name. You fought in arenas for entertainment and survival, learning to be theatrical about violence in ways that kept you alive longer.',
    abilityBoosts: ['STR', 'CHA'],
    skills: ['Performance', 'Gladiatorial Lore'],
  },
  {
    name: 'Guard',
    description: 'You stood watch at city gates, noble estates, or merchant caravans, learning that authority is only as effective as the willingness to back it up with force.',
    abilityBoosts: ['STR', 'CHA'],
    skills: ['Intimidation', 'Legal Lore'],
  },
  {
    name: 'Herbalist',
    description: 'You gathered and prepared plants for medicinal use, learning nature\'s pharmacy through years of careful study and the occasional near-lethal mistake.',
    abilityBoosts: ['CON', 'WIS'],
    skills: ['Nature', 'Herbalism Lore'],
  },
  {
    name: 'Hermit',
    description: 'You lived alone in the wilderness or a remote monastery for years, stripped of company and distraction until insight emerged from the silence.',
    abilityBoosts: ['CON', 'WIS'],
    skills: ['Nature', 'Hermit Lore'],
  },
  {
    name: 'Hunter',
    description: 'Forests and wilds were your home. You tracked prey through dense undergrowth and learned to read the land like others read books.',
    abilityBoosts: ['DEX', 'WIS'],
    skills: ['Survival', 'Hunting Lore'],
  },
  {
    name: 'Laborer',
    description: 'You dug ditches, hauled stone, and built the structures that gave others shelter. The work was hard and the pay was poor, but it built you into something formidable.',
    abilityBoosts: ['STR', 'CON'],
    skills: ['Athletics', 'Labor Lore'],
  },
  {
    name: 'Martial Disciple',
    description: 'You trained under a master of physical combat, spending years drilling techniques until they became reflex, developing a body as disciplined as a weapon.',
    abilityBoosts: ['STR', 'DEX'],
    skills: ['Acrobatics', 'Warfare Lore'],
  },
  {
    name: 'Merchant',
    description: 'Commerce was your schoolroom. You learned to read people, negotiate deals, and move goods across borders. Gold flows where you walk.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Diplomacy', 'Mercantile Lore'],
  },
  {
    name: 'Miner',
    description: 'You worked beneath the earth, reading stone for valuable ore and learning to sense structural danger before it collapsed on your crew.',
    abilityBoosts: ['STR', 'CON'],
    skills: ['Survival', 'Mining Lore'],
  },
  {
    name: 'Noble',
    description: 'You were raised in a house of influence and privilege. Etiquette, politics, and lineage were your earliest lessons. People grant you deference — and envy.',
    abilityBoosts: ['INT', 'CHA'],
    skills: ['Society', 'Genealogy Lore'],
  },
  {
    name: 'Nomad',
    description: 'You moved with the seasons and the herds, learning to read landscape and weather as a way of life. No terrain is truly foreign to someone who has crossed them all.',
    abilityBoosts: ['CON', 'WIS'],
    skills: ['Survival', 'Nomadic Culture Lore'],
  },
  {
    name: 'Pilgrim',
    description: 'A long journey of faith took you across dangerous roads and foreign lands. Your devotion was tested and your convictions were forged in the hardships that met you.',
    abilityBoosts: ['CON', 'WIS'],
    skills: ['Religion', 'Pilgrimage Lore'],
  },
  {
    name: 'Prisoner',
    description: 'You spent time locked away — whether justly or not. The experience stripped away everything except what mattered, leaving you harder, subtler, and harder to fool.',
    abilityBoosts: ['STR', 'DEX'],
    skills: ['Stealth', 'Underworld Lore'],
  },
  {
    name: 'Sailor',
    description: 'You worked the rigging on deep-water vessels, learning the rhythm of the sea and the discipline that keeps a crew alive when the ocean decides to test you.',
    abilityBoosts: ['STR', 'CON'],
    skills: ['Athletics', 'Sailing Lore'],
  },
  {
    name: 'Scholar',
    description: 'You spent years in libraries and lecture halls, learning from masters of knowledge. Your scholarly training opened doors to arcane, divine, or natural secrets.',
    abilityBoosts: ['INT', 'WIS'],
    skills: ['Arcana', 'Academia Lore'],
  },
  {
    name: 'Scout',
    description: 'You ranged ahead of armies and expeditions, gathering intelligence without being seen and returning with information that shaped the battles that followed.',
    abilityBoosts: ['DEX', 'WIS'],
    skills: ['Survival', 'Scouting Lore'],
  },
  {
    name: 'Street Urchin',
    description: 'You survived childhood in the roughest parts of the city by being faster, quieter, and smarter than the people who would have exploited you. Most of them failed.',
    abilityBoosts: ['DEX', 'CON'],
    skills: ['Stealth', 'City Lore'],
  },
  {
    name: 'Tinker',
    description: 'You took things apart to see how they worked, then put them back together — better. Your knack for mechanism and improvisation makes you invaluable when conventional methods fail.',
    abilityBoosts: ['DEX', 'INT'],
    skills: ['Crafting', 'Engineering Lore'],
  },
  {
    name: 'Warrior',
    description: 'You fought in wars, skirmishes, or mercenary companies, learning that the difference between veterans and corpses is usually experience, not luck.',
    abilityBoosts: ['STR', 'CON'],
    skills: ['Intimidation', 'Warfare Lore'],
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
