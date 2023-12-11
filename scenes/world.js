async function setWorld(worldState) {

  setBackground(Color.fromHex(Colors.worldBackground))
  
  let currentKeyPressed = "";
  add([
    sprite(WorldSprites.background),
    scale(2),
    pos(0, 0),
  ])
  
  add([
    sprite(WorldSprites.backgroundForeground),
    scale(2),
    pos(0, 0),
    z(100)
  ])

  const player = add([
    sprite(worldState?.latestSprite || WorldSprites.playerDown),
    pos(686.951, 1566.267),
    scale(2),
    area(),
    body(),
    {
      currentSprite: WorldSprites.playDown,
      speed: 200,
      isInDialogue: false,
    }
  ])

  let encounterMusic = null

  if (!worldState) {
    worldState = {
      faintedMons: [],
      playerObject: getPlayer(),
      playerWon: true,
      tutorialSeen: false,      
    }
    worldState.playerObject.position = player.pos
  } else {
    player.pos = !worldState.playerWon ? vec2(686.951, 1118.919) : worldState.playerObject.position
    player.flipX = !!worldState.playerObject.flipX
  }

  if(!worldState.playerWon){
    const iris = add([
      sprite(WorldSprites.irisContinue),
      scale(2),
      pos(1280, 720 + 174 * 2),
      z(10000),
      fixed(),
      anchor('botright'),
    ])

    tween(iris.pos.y, 720, 1, (val) => iris.pos.y = val, easings.linear)
    setTimeout(() => {
      tween(iris.pos.y, 720 + 174 * 2, 1, (val) => iris.pos.y = val, easings.linear)
    }, 10000)
    worldState.playerWon = true  
  }

  add([
    sprite(WorldSprites.tutorial),
    pos(380, 1700),
    z(1000),
    opacity(1),
  ]);

  // add protection score
  addProtectionScore(worldState);

  // add music for world
  addWorldMusic(worldState);

  // get enemies 
  const enemies = getEnemies();
  const npcs = getNpcs();


  // add marc1n boss
  let marc1nStatement = 0;
  if (worldState.faintedMons.length === 5) {
      worldState.playerObject.position = player.pos
      player.isInDialogue = true
      const dir = player.pos.sub(vec2(player.pos.x, player.pos.y - 300)).unit()
      const marc1n = add([
        sprite(enemies[Types.Marc1n].imageSmall),
        pos(vec2(player.pos.x, player.pos.y - 300)),
        scale(2),
        area(),
        body(),
        move(dir.scale(1), 50),
        {
          name: enemies[Types.Marc1n].threatName,
          openingMessages: enemies[Types.Marc1n].openingMessages,
        },
        'marc1n'
      ])
      loop(.2, () => {
        marc1n.flipX = !marc1n.flipX
      }) 
      player.onCollide('marc1n', (object) => {
        const m = marc1n.pos
        destroy(marc1n)
        add([
          sprite(enemies[Types.Marc1n].imageSmall),
          pos(m.add(vec2(0, -1))),
          scale(2),
          area(),
          body(),
          {
            name: enemies[Types.Marc1n].threatName,
            openingMessages: enemies[Types.Marc1n].openingMessages,
          },
          'marc1n'
        ])
        worldState.playerObject.position = player.pos    
        worldState.enemyName = 'marc1n'
        const dialogueBoxFixedContainer = add([fixed(), z(1000)])
        const dialogueBox = dialogueBoxFixedContainer.add([
          rect(1000, 200, {radius: 32}),
          outline(5),
          pos(150, 500),
          fixed(),
        ])
        dialogueBox.add([
          text(`[wavy]${object.name}[/wavy][normal]: ${object.openingMessages[0]}[/normal]`, {
            size: 42,
            width: 900,
            lineSpacing: 15,
            font: 'pixelFont',
            align: 'center',
            styles: {
              wavy: (idx, ch) => ({
                  color: Color.fromHex(Colors.malwareBlue),
                  pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
                }),
              normal: {
                color: Color.fromHex(Colors.worldBackground)
              }
            }
          }),
          pos(40,30),
          fixed(),
        ])
        marc1nStatement += 1;
        onUpdate(() => {
          if (isKeyPressed('space')) {
            if (marc1nStatement >= object.openingMessages.length) {
              dialogueBoxFixedContainer.hidden = true
              dialogueBox.remove(dialogueBox.children[0])
              player.isInDialogue = false;
              marc1nStatement = 0;
              worldState.worldMusic.paused = true;
              encounterMusic.paused = true;
              go(SceneNames.battle, worldState); 
            } else {
              if (marc1nStatement > 0) dialogueBox.remove(dialogueBox.children[0])
              if (marc1nStatement === object.openingMessages.length - 1) {
                worldState.worldMusic.volume = 0
                encounterMusic = play(Sounds.enemyEncounter, {loop: false, volume: SoundVolume})
                encounterMusic.then(() => tween(worldState.worldMusic.volume, SoundVolume / 2, 1, (val) => worldState.worldMusic.volume = val, easings.easeInQuad))
              }
              player.isInDialogue = true
              play(Sounds.select, {loop: false, volume: SoundVolume})
              dialogueBox.add([
                text(`[wavy]${object.name}[/wavy][normal]: ${object.openingMessages[marc1nStatement]}[/normal]`, {
                  size: 42,
                  width: 900,
                  lineSpacing: 15,
                  font: 'pixelFont',
                  align: 'center',
                  styles: {
                    wavy: (idx, ch) => ({
                        color: Color.fromHex(Colors.malwareBlue),
                        pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
                      }),
                    normal: {
                      color: Color.fromHex(Colors.worldBackground)
                    }
                  }
                }),
                pos(40,30),
                fixed(),
              ])
              dialogueBoxFixedContainer.hidden = false
              marc1nStatement += 1
            }
          }
        })
      })  
  }

  const dialogueBoxFixedContainer = add([fixed(), z(1000)])
  const dialogueBox = dialogueBoxFixedContainer.add([
    rect(1000, 200, {radius: 32}),
    outline(5),
    pos(150, 500),
    fixed(),
  ])

  dialogueBoxFixedContainer.hidden = true
  let npcStatement = 0;
  for (const npc in npcs) {
    npcObj = npcs[npc]
    add([
      sprite(npcObj.imageSmall),
      pos(npcObj.location.x, npcObj.location.y),
      scale(2),
      area(),
      body({isStatic: true}),
      {
        currentSprite: npcObj.imageSmall,
        isInDialogue: false,
        name: npcObj.npcName,
        message: npcObj.message,
      },
      npc
    ])
    player.onCollideUpdate(npc, (object) => {
        if (isKeyPressed('space')) {
          footsteps.paused = true;
          if (npcStatement >= object.message.length) {
            dialogueBoxFixedContainer.hidden = true
            dialogueBox.remove(dialogueBox.children[0])
            player.isInDialogue = false;
            npcStatement = 0;
          } else {
            if (npcStatement > 0) dialogueBox.remove(dialogueBox.children[0]) 
            player.isInDialogue = true
            play(Sounds.select, {loop: false, volume: SoundVolume})
            dialogueBox.add([
              text(`[wavy]${object.name}[/wavy][normal]: ${object.message[npcStatement]}[/normal]`, {
                size: 42,
                width: 900,
                lineSpacing: 15,
                font: 'pixelFont',
                align: 'center',
                styles: {
                  wavy: (idx, ch) => ({
                      color: Color.fromHex(Colors.malwareBlue),
                      pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
                    }),
                  normal: {
                    color: Color.fromHex(Colors.worldBackground)
                  }
                }
              }),
              pos(40,30),
              fixed(),
            ])
            dialogueBoxFixedContainer.hidden = false
            npcStatement += 1
          }
        }
    })  
  }

  let enemyStatement = 0;
  for (const enemy in enemies) {
    enemyObj = enemies[enemy]
    if (!worldState.faintedMons.includes(enemyObj.threatName)) {
      if (!enemyObj.usable) continue;
      add([
        sprite(enemyObj.imageSmall),
        pos(enemyObj.location.x, enemyObj.location.y),
        scale(2),
        area(),
        body({isStatic: true}),
        {
          currentSprite: enemyObj.imageSmall,
          isInDialogue: false,
          name: enemyObj.threatName,
          openingMessages: enemyObj.openingMessages,
        },
        enemy
      ])
      player.onCollide(enemy, (object) => {
        if (worldState.faintedMons.length < 3 && enemies[enemy].threatName === "Exploit Eagan"){
          footsteps.paused = true;
            player.isInDialogue = true
            const dialogueBoxFixedContainer = add([fixed(), z(1000)])
            const dialogueBox = dialogueBoxFixedContainer.add([
              rect(1000, 200, {radius: 32}),
              outline(5),
              pos(150, 500),
              fixed(),
            ])
            dialogueBox.add([
              text(`[wavy]${object.name}[/wavy][normal]: Your protection score is not high enough to face me yet!.[/normal]`, {
                size: 42,
                width: 900,
                lineSpacing: 15,
                font: 'pixelFont',
                align: 'center',
                styles: {
                  wavy: (idx, ch) => ({
                      color: Color.fromHex(Colors.malwareBlue),
                      pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
                    }),
                  normal: {
                    color: Color.fromHex(Colors.worldBackground)
                  }
                }
              }),
              pos(40,30),
              fixed(),
            ])
            onUpdate(() => {
            if (isKeyPressed('space')) {
              dialogueBoxFixedContainer.hidden = true
              dialogueBox.remove(dialogueBox.children[0])
              play(Sounds.select, {loop: false, volume: SoundVolume})
              player.isInDialogue = false;
              currentKeyPressed = "";

            }})
        
        } else {
          footsteps.paused = true;
          worldState.worldMusic.volume = 0
          encounterMusic = play(Sounds.enemyEncounter, {loop: false, volume: SoundVolume})
          encounterMusic.then(() => tween(worldState.worldMusic.volume, SoundVolume / 2, 1, (val) => worldState.worldMusic.volume = val, easings.easeInQuad))
          worldState.playerObject.position = player.pos    
          worldState.enemyName = enemy
          player.isInDialogue = true
          const dialogueBoxFixedContainer = add([fixed(), z(1000)])
          const dialogueBox = dialogueBoxFixedContainer.add([
            rect(1000, 200, {radius: 32}),
            outline(5),
            pos(150, 500),
            fixed(),
          ])
          dialogueBox.add([
            text(`[wavy]${object.name}[/wavy][normal]: ${object.openingMessages[0]}[/normal]`, {
              size: 42,
              width: 900,
              lineSpacing: 15,
              font: 'pixelFont',
              align: 'center',
              styles: {
                wavy: (idx, ch) => ({
                    color: Color.fromHex(Colors.malwareBlue),
                    pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
                  }),
                normal: {
                  color: Color.fromHex(Colors.worldBackground)
                }
              }
            }),
            pos(40,30),
            fixed(),
          ])
          enemyStatement += 1;
          onUpdate(() => {
            if (isKeyPressed('space')) {
              if (enemyStatement >= object.openingMessages.length) {
                dialogueBoxFixedContainer.hidden = true
                dialogueBox.remove(dialogueBox.children[0])
                player.isInDialogue = false;
                enemyStatement = 0;
                worldState.worldMusic.paused = true;
                encounterMusic.paused = true;
                go(SceneNames.battle, worldState); 
              } else {
                if (enemyStatement > 0) dialogueBox.remove(dialogueBox.children[0]) 
                player.isInDialogue = true
                play(Sounds.select, {loop: false, volume: SoundVolume})
                dialogueBox.add([
                  text(`[wavy]${object.name}[/wavy][normal]: ${object.openingMessages[enemyStatement]}[/normal]`, {
                    size: 42,
                    width: 900,
                    lineSpacing: 15,
                    font: 'pixelFont',
                    align: 'center',
                    styles: {
                      wavy: (idx, ch) => ({
                          color: Color.fromHex(Colors.malwareBlue),
                          pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
                        }),
                      normal: {
                        color: Color.fromHex(Colors.worldBackground)
                      }
                    }
                  }),
                  pos(40,30),
                  fixed(),
                ])
                dialogueBoxFixedContainer.hidden = false
                enemyStatement += 1
              }
            }
          })
      }
      })  
    }
  }
  
  addCollisionMap();

  let tick = 0
  onUpdate(() => {
    camPos(player.pos)
    tick++
    if((isKeyDown('down') || isKeyDown('up')) && tick % 20 === 0 && !player.isInDialogue) {
      player.flipX= !player.flipX
    }
  })
  
  function setSprite( player, spriteName ) {
    worldState.latestSprite = spriteName
    if (player.currentSprite !== spriteName) {
      player.use(sprite(spriteName))
      player.currentSprite = spriteName
    }
  }

  let footsteps = play(Sounds.footsteps, { loop: true, volume: SoundVolume, paused: true})
  
  onKeyDown('down', () => {
    if (player.isInDialogue) return
    if (currentKeyPressed === "down" || currentKeyPressed === ''){
      setSprite(player, WorldSprites.playerDown)
      player.move(0, player.speed)
      keyPressed = true;
      currentKeyPressed = 'down';
      footsteps.speed = 1.5;
      footsteps.paused = false;
    }
  })
  
  onKeyDown('up', () => {
    if (player.isInDialogue) return
    if (currentKeyPressed === "up" || currentKeyPressed === ''){
      setSprite(player, WorldSprites.playerUp)
      player.move(0, -player.speed)
      keyPressed = true;
      currentKeyPressed = 'up';
      footsteps.speed = 1.5;
      footsteps.paused = false;
    }
  })
  
  onKeyDown('left', () => {
    if (player.isInDialogue) return
    if (currentKeyPressed === "left" || currentKeyPressed === ''){
      player.flipX = false
      if (player.curAnim() !== 'walk') {
        setSprite(player, WorldSprites.playerSide)
        player.play('walk')
      }
      player.move(-player.speed, 0)
      keyPressed = true;
      currentKeyPressed = 'left';
      footsteps.speed = 1.5;
      footsteps.paused = false;
    }
  })
  
  onKeyDown('right', () => {
    if (player.isInDialogue) return
    if (currentKeyPressed === "right" || currentKeyPressed === ''){
      player.flipX = true
      if (player.curAnim() !== 'walk') {
        setSprite(player, WorldSprites.playerSide)
        player.play('walk')
      }
      player.move(player.speed, 0)
      currentKeyPressed = 'right';
      footsteps.speed = 1.5;
      footsteps.paused = false;
    }
  })
  
  onKeyRelease((key) => {
    if (player.isInDialogue) return
    if(key === Keys.down || key === Keys.up || key === Keys.left || key === Keys.right)
    {
      currentKeyPressed = "";
      player.stop()
      footsteps.paused = true;
    }
  })
  
  onKeyPress('escape', () => {
    if (player.isInDialogue) return
    worldState.playerObject.position = player.pos 
    worldState.playerObject.flipX = player.flipX
    worldState.latestScreenshot = screenshot()
    go(SceneNames.glossary, worldState);
  });

  onKeyPress('c', () => {
    if (player.isInDialogue) return
    worldState.faintedMons = [Types.Malware, Types.Scam, Types.Exploit, Types.Tracker, Types.BruteForce]
    worldState.playerObject.position = player.pos 
    worldState.playerObject.flipX = player.flipX
    worldState.worldMusic.paused = true;
    go(SceneNames.intro, { isEnding: true }, worldState);
  });

  for(const mon of worldState.faintedMons){
    destroy(get(mon)[0])
  }

  if (worldState.latestScreenshot) {
    worldState.latestScreenshot = null
  } else {
    await flashScreen({fadeIn: true});
  }
}
