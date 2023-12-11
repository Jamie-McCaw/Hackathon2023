function loadAssets() {
  loadFont('pixelFont', 'assets/fonts/PixeloidSans-mLxMm.ttf')
  loadSprite(BattleSprites.background, 'assets/backgrounds/battleBackground.png')
  loadSprite(BattleSprites.marcin, 'assets/characters/marcin.png')
  loadSprite(WorldSprites.background, 'assets/backgrounds/main-level.png')
  loadSprite(WorldSprites.backgroundForeground, 'assets/backgrounds/main-level-foreground.png')
  loadSprite(WorldSprites.threatTown, 'assets/backgrounds/threatTown-big.png')
  loadSprite(WorldSprites.irisContinue, 'assets/sprites/iris-continue.png')
  loadSprite(WorldSprites.tutorial, 'assets/sprites/controls.png')
  loadSprite(BattleSprites.player, 'assets/characters/Zero.png')
  loadSprite(BattleSprites.bruteForceSherwood, 'assets/characters/brute.png')
  loadSprite(BattleSprites.exploitEagan, 'assets/characters/eagan.png')
  loadSprite(BattleSprites.trackerChuck, 'assets/characters/tracker.png')
  loadSprite(BattleSprites.threatDown, '/assets/sprites/threat-down.png')
  loadSprite(BattleSprites.nigerianPrinceJohn, '/assets/characters/nigerian-prince.png')
  loadSprite(BattleSprites.malwareMark, '/assets/characters/malware.png')
  loadSprite(BattleSprites.enemyShadow, '/assets/characters/enemy-shadow.png')
  loadSprite(BattleSprites.marc1n, 'assets/characters/marcin-boss.png')
  loadSound(Sounds.battleMusic, 'assets/audio/battle-music.wav')
  loadSound(Sounds.attackMiss, 'assets/audio/attack-miss.wav')
  loadSound(Sounds.select, 'assets/audio/select.wav')
  loadSound(Sounds.victoryMusic, 'assets/audio/victory-music.wav')
  loadSound(Sounds.enemyAttack, 'assets/audio/enemy-attack.wav')
  loadSound(Sounds.lossSound, 'assets/audio/loss-sound.ogg')
  loadSound(Sounds.worldMusic, 'assets/audio/Cyberpunk Moonlight Sonata v2.mp3')
  loadSound(Sounds.introMusic, 'assets/audio/little town - orchestral.ogg')
  loadSound(Sounds.footsteps, 'assets/audio/footsteps.wav')
  loadSound(Sounds.enemyEncounter, 'assets/audio/alarm.wav')
  loadSound(Sounds.threatDown, 'assets/audio/threat-down.mp3')
  loadSound(Sounds.zeroWinsThreatDown, 'assets/audio/zero-wins-threat-down.mp3')
  
  loadSpriteAtlas('./assets/sprites/controls.png', {
    [WorldSprites.scanSummaryControl] : { x: 0, y : 0, height: 320, width: 240 }
  })
    
  loadSpriteAtlas('./assets/characters/actors-small.png', {
    [WorldSprites.playerDown]: { x: 0, y: 96, width: 16, height: 16 },
    [WorldSprites.playerUp]: { x: 16, y: 96, width: 16, height: 16 },
    [WorldSprites.playerSide]: { x: 0, y: 112, width: 32, height: 16, sliceX: 2, sliceY: 1, anims: { 'walk': { from: 0, to: 1, speed: 6 } } },
    [WorldSprites.david]: { x: 96, y: 64, width: 16, height: 16 },
    [WorldSprites.jamie]: { x: 96, y: 96, width: 16, height: 16 },
    [WorldSprites.jon]: { x: 80, y: 96, width: 16, height: 16 },
    [WorldSprites.carlos]: { x: 80, y: 64, width: 16, height: 16 },
    [WorldSprites.marc1n] : { x: 0, y: 0, height: 16, width: 16 },
    [WorldSprites.exploitEagan] : { x: 0, y: 48, height: 16, width: 16 },
    [WorldSprites.trackerChuck] : { x: 32, y: 16, height: 16, width: 16 },
    [WorldSprites.bruteForceSherwood] : {x: 32, y: 32, height: 16, width: 16 },
    [WorldSprites.malwareMark] : { x: 32, y: 64, height: 16, width: 16 },
    [WorldSprites.nigerianPrinceJohn] : {x: 32, y: 80, height: 16, width: 16 },
    [CreatorSprites.carlos] : { x: 64, y: 80, height: 16, width: 32, sliceX: 2, sliceY: 1, anims: {
      'jump': { from: 1, to: 0, speed: 1 }
    }},
    [CreatorSprites.jamie] :  { x: 96, y: 112, height: 16, width: 32, sliceX: 2, sliceY: 1, anims: {
      'jump': { from: 1, to: 0, speed: 1 }
    }},
    [CreatorSprites.poonam] : { x: 64, y: 48, height: 16, width: 32, sliceX: 2, sliceY: 1, anims: {
      'jump': { from: 1, to: 0, speed: 1 }
    }},
    [CreatorSprites.jekko] : { x: 64, y: 112, height: 16, width: 32, sliceX: 2, sliceY: 1, anims: {
      'jump': { from: 1, to: 0, speed: 1 }
    }},
    [CreatorSprites.david] : { x: 96, y: 80, height: 16, width: 32, sliceX: 2, sliceY: 1, anims: {
      'jump': { from: 1, to: 0, speed: 1 }
    }},
  })
}