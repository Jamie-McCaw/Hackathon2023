let showingTitleCard = true;

function setIntro({ isEnding = false } = {}, worldState = {}) {
  const dialogText = isEnding ? outroText : introText 

  setBackground(Color.fromHex(Colors.background))

  const introMusic = play(Sounds.introMusic, {loop: true, volume: 0, paused: false})
  tween(introMusic.volume, SoundVolume+0.1, 3, (val) => introMusic.volume = val, easings.easeInQuad)

  const marcin = add([
    sprite('marcin'),
    pos(0,0),
  ])

  const box = add([
    rect(750, 150, { radius: 32 }),
    pos(center().add( -375, 175)),
    color(255, 255, 255),
    outline(4, Color.fromHex(Colors.worldBackground)),
    scale(1),
    opacity(0),
  ])

  const dialogue = box.add([
    text('', {size: 42, width: 750 - 20, height: 150, align: 'center', font: 'pixelFont'}),
    pos(20, 20),
    color(Color.fromHex(Colors.worldBackground)),
    opacity(0),
  ])

  setTimeout(() =>{
    tween(box.opacity, 1, .5, (val) => box.opacity = val, easings.easeInQuad)
    tween(dialogue.opacity, 1, .5, (val) => dialogue.opacity = val, easings.easeInQuad)
  }, 500)

  const titleCard = add([
    sprite(WorldSprites.threatTown),
    pos(0, 0),
    z(1000),
  ]);

  if (isEnding) {
    titleCard.destroy();
    showingTitleCard = false;
    tween(
      marcin.pos,
      center().add(-240, -325),
      .5,
      (p) => marcin.pos = p,
      easings.easeInSine
    )
  }

  let statement = 0;

  onKeyPress("space", async () => {
    play(Sounds.select, {loop: false, volume: SoundVolume})
    if (showingTitleCard) {
      showingTitleCard = false;
      titleCard.destroy();
      tween(
        marcin.pos,
        center().add(-240, -325),
        .5,
        (p) => marcin.pos = p,
        easings.easeInSine
      );
      return;
    }
    statement = statement + 1
    if (statement >= dialogText.length) {
      await flashScreen();
      if (isEnding) {
        go(SceneNames.credits, worldState)
        return;
      }
      await tween(introMusic.volume, 0, 1.5, (val) => introMusic.volume = val, easings.easeInQuad)
      await (introMusic.paused = true)
      go(SceneNames.world)
    } else {
      updateStatement()
    }
  })

  onKeyPress("p", async () => {
    if (isEnding) return;
    introMusic.paused = true
    go(SceneNames.world)
  })

  function updateStatement() {
    dialogue.text = dialogText[statement]
  }

  updateStatement()
}