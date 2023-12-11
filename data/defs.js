const Types = {
    Malware : 'malware',
    Scam : 'scam',
    Exploit : 'exploit',
    Tracker : 'tracker',
    BruteForce : 'bruteforce',
    Marc1n : 'marc1n'
};

const Npcs = {
    David : 'David',
    Jamie: 'Jamie',
    Jon: 'Jon',
    Poonam: 'Poonam',
    Carlos: 'Carlos'
}

const AttackHints = {
    [Types.Malware] : 'Remediation is effective against Malware',
    [Types.Scam] : 'Reporting Spam is effective against Scams',
    [Types.Phishing] : 'Reporting Spam is effective against Phishing',
    [Types.Exploit] : 'Remediation is effective against Exploits',
    [Types.Tracker] : 'Installing Browser Guard is effective against Trackers',
    [Types.BruteForce] : 'Turing on your firewall is effective against Brute Force attacks'
};

const EffectiveText = {
    SuperEffective : 'This attempt was super effective!',
    NotEffective : 'This attempt was ineffective, try something else!'
};

const SceneNames = {
    intro : 'intro',
    world : 'world',
    battle : 'battle',
    glossary: 'glossary',
    credits: 'credits',
    creditsCC: 'creditsCC',
    theEnd: 'the-end'
}

// Sprites used in battles
const BattleSprites = {
    background : 'battle',
    player : 'battle-zero',
    marcin : 'marcin',
    threatDown : 'threat-down',
    exploitEagan : 'exploit-eagan',
    trackerChuck : 'tracker-chuck',
    malwareMark : 'malware-mark',
    bruteForceSherwood : 'brute-force-sherwood',
    nigerianPrinceJohn : 'nigerian-prince-john',
    enemyShadow : 'enemy-shadow',
    marc1n : 'marc1n'
}

const Sounds = {
    battleMusic : 'battle-audio',
    attackMiss : 'attack-miss',
    select : 'select',
    enemyAttack : 'enemy-attack',
    victoryMusic : 'victory-music',
    lossSound : 'loss-sound',
    worldMusic : 'world-music',
    footsteps : 'footsteps',
    enemyEncounter : 'enemy-encountered',
    introMusic : 'intro-music',
    threatDown: 'threat-down',
    zeroWinsThreatDown: 'zero-wins-threat-down',
}

// Sprites used in world
const WorldSprites = {
    background : 'world',
    backgroundForeground : 'world-foreground',
    irisContinue : 'iris-continue',
    tutorial : 'tutorial',
    marc1n : 'marcin-small',
    exploitEagan : 'exploit-eagan-small',
    trackerChuck : 'tracker-chuck-small',
    malwareMark : 'malware-mark-small',
    bruteForceSherwood : 'brute-force-sherwood-small',
    nigerianPrinceJohn : 'nigerian-prince-john-small',
    david : 'david-small',
    jamie : 'jamie-small',
    jon: 'jon-small',
    poonam: 'poonam-small',
    carlos: 'carlos-small',
    playerDown : 'player-down',
    playerUp : 'player-up',
    playerSide : 'player-side',
    scanSummaryControl : 'scan-summary-control',
    threatTown : 'threat-town'
}

const Colors = {
    background : '#36A6E0',
    worldBackground : '#1a1a1a',
    dialogBackground : '#63625B',
    dialogBorder : '#63625b',
    malwareBlue : '#082882',
    black: '#000000',
    white: '#FFFFFF',
    colorBlock1: '#27ADF8',
    colorBlock2: '#00FFFF',
    colorBlock3: '#61EDD7',
    colorBlock4: '#A3F7B5',
    colorBlock5: '#8ED788',
}
const Keys = {
    down : 'down',
    up : 'up',
    left : 'left',
    right : 'right',
    escape : 'escape',
    enter : 'enter',
    space : 'space'
}

const introText = [
    'Hi, Marcin Klecynzski here, founder and CEO of Malwarebytes.',
    'I created Malwarebytes after I accidentally infected my family computer with malware.',
    "Now, more than 10 years later, we work hard to keep people safe from hackers.",
    "That's where you come in Malwarenaut!",
    'You have been recruited to test out our latest technology in fighting malware.',
    'Imagine a video game without malware.',
    "I need your help cleaning up the internet! Let's do it!"
]

const outroText = [
    'Good job catching that imposter.',
    'Always be wary of strange text messages like that.',
    'Keep up the good work Malwarenaut!',
    'Thanks to you the internet is a safer place!'
]

const TurnPhase = {
    player : 'player',
    middle : 'middle',
    enemy : 'enemy',
    cleanup : 'cleanup'
}

const EndingText = {
    victory : 'Threat Down!',
    loss : 'Oh No!! You Failed To Take Threats Down, try again !!'
}

const SoundVolume = 0.1

const CreatorSprites = {
    jamie: 'jamie',
    carlos: 'carlos',
    poonam: 'poonam',
    jekko: 'jekko',
    david: 'david'
}