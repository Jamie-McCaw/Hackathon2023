async function setBattle(worldState) {
    const backgroundHeight = 720;
    const backgroundWidth = 1280;
    let playerModel = worldState.playerObject;
    let endingFadeTimout = 3500;
    playerModel.currentSecurityScore = playerModel.maxSecurityScore
    worldState.playerWon = true;
    let enemyModel = getEnemies()[worldState.enemyName];
    let currentTurn = TurnPhase.player;
    let battleBackground = add([
        sprite(BattleSprites.background, { flipX: true }),
        scale(1),
        anchor('center'),
        pos(center().x, center().y)
    ])

    let backgroundX = battleBackground.pos.x
    let backgroundY = battleBackground.pos.y
    let offsets = {
        playerX: 215,
        playerY: -100,
        enemyX: -350,
        enemyY: -50
    };

    let healthBarSize = {
        height: 50,
        width: 304
    }

    const optionPadding = {
        top: 15,
        left: 15
    }

    let music = play(Sounds.battleMusic, { loop: true, volume: 0.05})

    // Enemy Start
    const enemy = add([
        sprite(enemyModel.imageLarge),
        pos(backgroundX + offsets.enemyX, backgroundY + offsets.enemyY),
        scale(2),
        opacity(1),
        anchor('center'),
        area(),
        body(),
        {
            currentSprite: enemyModel.imageLarge,
            currentEnemy: enemyModel
        },
        z(2)
    ])


    const enemyHealthBox = add([
        rect(450, 50, { radius: 4 }),
        pos(enemy.pos.x, enemy.pos.y - enemy.height - 25),
        anchor('center'),
        color(Color.fromHex(Colors.dialogBackground)),
        outline(4, Color.fromHex(Colors.dialogBorder)),
        opacity(0.8)
    ])

    const enemyNameText = enemyHealthBox.add([
        text(enemyModel.threatName, { width: enemyHealthBox.width, font: 'pixelFont', align: 'center' }),
        pos(3, 2),
        anchor('center'),
        color(WHITE)
    ])

    const enemyShadow = add([
        sprite(BattleSprites.enemyShadow),
        pos(enemy.pos.x, enemy.pos.y - 50),
        scale(3),
        opacity(.9),
        anchor('center'),
        z(1)
    ])

    // Enemy End

    // Player Start

    const player = add([
        sprite(BattleSprites.player),
        pos(backgroundX + offsets.playerX, backgroundY + offsets.playerY),
        anchor('topleft'),
        scale(4),
        area(),
        body(),
        opacity(1),
        {
            currentSprite: BattleSprites.player,
        }
    ])

    const playerHealthBox = add([
        rect(350, 150, { radius: 4 }),
        pos(backgroundX + backgroundWidth / 2 - 40, backgroundY - backgroundHeight / 2 + 40),
        anchor('topright'),
        outline(4, Color.fromHex(Colors.dialogBorder)),
        opacity(.8),
        color(Color.fromHex(Colors.dialogBackground)),
    ])

    const playerNameText = playerHealthBox.add([
        text(playerModel.playerName, { width: playerHealthBox.width, font: 'pixelFont' }),
        pos(10, 20),
        anchor('topright'),
        color(WHITE),
        {
            destroyed: false
        }
    ])

    const playerHealthBarOutline = playerHealthBox.add([
        rect(healthBarSize.width, healthBarSize.height, { radius: 4 }),
        pos(-playerHealthBox.width + (playerHealthBox.width - healthBarSize.width) / 2, playerHealthBox.height - healthBarSize.height - 30),
        color(WHITE),
        anchor('topleft'),
        outline(4),
    ])

    const playerHealthBar = playerHealthBarOutline.add([
        rect(playerModel.currentSecurityScore * 3, healthBarSize.height - 4, { radius: 2 }),
        pos(2, 2),
        color(RED),
        anchor('topleft'),
    ])

    const playerHealthText = playerHealthBarOutline.add([
        text("HP: " + playerModel.currentSecurityScore, {font: 'pixelfont', size: 15}),
        color(WHITE),
        anchor('topleft'),
        pos(0, playerHealthBarOutline.height + 5),
        {
            currentHealth: 100
        }
    ])

    // Player End

    // Options Dialog Start
    let dialogOptionsModels = getPlayerAttackModels(playerModel);

    const textBoxOptions = add([
        rect(800, 150, { radius: 8 }),
        pos(battleBackground.pos.x - 1210 / 2, battleBackground.pos.y + 175),
        outline(8, Color.fromHex(Colors.dialogBorder)),
        color(Color.fromHex(Colors.dialogBackground)),
        opacity(.8)
    ])

    const responseText = textBoxOptions.add([
        text("", {
            width: textBoxOptions.width,
            height: textBoxOptions.height, 
            font: 'pixelFont'
        }),
        pos(optionPadding.left, optionPadding.top),
        color(WHITE),
        opacity(0)
    ])

    const attackOptionOne = textBoxOptions.add([
        text(dialogOptionsModels[1].text, {
            width: textBoxOptions.width * (2/5),
            height: textBoxOptions.height / 2,
            font: 'pixelFont'
        }),
        pos(optionPadding.left, optionPadding.top),
        color(WHITE)
    ])
    const attackOptionTwo = textBoxOptions.add([
        text(dialogOptionsModels[2].text, {
            width: textBoxOptions.width * (3/5),
            height: textBoxOptions.height / 2,
            font: 'pixelFont'
        }),
        pos(attackOptionOne.width + optionPadding.left, optionPadding.top),
        color(WHITE)
    ])
    const attackOptionThree = textBoxOptions.add([
        text(dialogOptionsModels[3].text, {
            width: textBoxOptions.width * (2/3),
            height: textBoxOptions.height / 2,
            font: 'pixelFont'
        }),
        pos(optionPadding.left, textBoxOptions.height / 2 + 4 + optionPadding.top),
        color(WHITE)
    ])
    const attackOptionFour = textBoxOptions.add([
        text(dialogOptionsModels[4].text, {
            width: textBoxOptions.width * (3/5),
            height: textBoxOptions.height / 2,
            font: 'pixelFont'
        }),
        pos(attackOptionOne.width + optionPadding.left, textBoxOptions.height / 2 + 4 + optionPadding.top),
        color(WHITE)
    ])

    const dialogOptionsObjects = {
        1: attackOptionOne,
        2: attackOptionTwo,
        3: attackOptionThree,
        4: attackOptionFour
    }

    updateDialogAttackText(dialogOptionsObjects, dialogOptionsModels)


    // Dialog Options End
    
    // End Fight -  Start

    const endFightBackground = add([
        rect(1280, 720),
        pos(center().x, center().y),
        outline(10),
        anchor('center'),
        color(BLACK),
        opacity(0),
        z(2)
    ])

    const endFightDialog = add([
        rect(400, 100, { radius: 8 }),
        pos(center().x, center().y + 250),
        outline(10),
        anchor('center'),
        color(WHITE),
        opacity(0),
        z(3)
    ])

    const endFightText = endFightDialog.add([
        text(EndingText.victory, {
            width: endFightDialog.width,
            height: endFightDialog.height,
            font: 'pixelFont',
            align: 'center'
        }),
        pos(0,0),
        anchor('center'),
        color(0,0,0),
        opacity(0)
    ])

    const threatDownLogo = add([
        sprite(BattleSprites.threatDown),
        pos(center().x, center().y - 100),
        scale(4),
        opacity(0),
        anchor('center'),
        z(3)
    ])

    // Dialog Options End   
    let enterRunning = false;


    // Game loop (basically)
    onKeyPress(Keys.space, async () => {
        if(enterRunning){
            return;
        }
        enterRunning = !enterRunning;

        if (playerModel.currentSecurityScore <= 0 || enemyModel.currentHealth <= 0) {
            if(playerModel.currentSecurityScore <= 0) { // player loses
                playerModel.currentSecurityScore = playerModel.maxSecurityScore;
                endFightDialog.height = 200;
                endFightDialog.pos = vec2(center().x, center().y)
                endFightText.text = EndingText.loss
                fadeInObject(endFightBackground, 0.5, easings.linear)
                fadeInObject(endFightDialog, 1, easings.linear)
                fadeInObject(endFightText, 1, easings.linear)
                worldState.playerWon = false;
                music.paused = true
                play(Sounds.lossSound, { loop: false, volume: SoundVolume})
                endFightText.text = EndingText.loss;
                // fadeInDialog(endFightDialog, endFightText);
                setTimeout(() => {
                    flashScreen();
                    go(SceneNames.world, worldState);
                    enterRunning = !enterRunning;    
                }, endingFadeTimout)
                
            } else { // Player wins
                music.paused = true
                endFightText.text = EndingText.victory;
                fadeOutObject(enemy, 0.5, easings.linear)
                fadeOutObject(enemyShadow, 0.5, easings.linear)
                setTimeout(() => {
                    flashObject(endFightDialog, 1.5)
                    flashObject(endFightText, 1.5)
                    flashObject(threatDownLogo, 1.5)
                },500)
                setTimeout(() => {
                    fadeInObject(endFightBackground, 1, easings.linear)
                },2000)

                destroy(enemyHealthBox);
                let victoryMusic = play(Sounds.victoryMusic, {loop:false, volume: SoundVolume})
                play(Sounds.zeroWinsThreatDown, {loop:false, volume: SoundVolume * 4})
                setTimeout(() => {
                    worldState.faintedMons.push(worldState.enemyName);
                    flashScreen();
                    victoryMusic.paused = true;
                    if(worldState.enemyName === Types.Marc1n) {
                        go(SceneNames.intro, { isEnding: true }, worldState);
                    } else {
                        go(SceneNames.world, worldState);
                    }
                    enterRunning = !enterRunning;
                }, endingFadeTimout)
            }
        } else {
            if (currentTurn === TurnPhase.player) {
                let selectedAttackKey = getSelected(dialogOptionsModels);
                let effective = doPlayerAttack(dialogOptionsModels[selectedAttackKey].action, dialogOptionsObjects, responseText, enemyModel);
                makeSpriteShake(player, true);
                makeSpriteFlash(enemy);            
                if(!effective) {
                    play(Sounds.attackMiss, { loop: false, volume: SoundVolume})
                } else {
                    play(Sounds.enemyAttack, { loop: false, volume: SoundVolume})
                }            
                swapDialogContents(dialogOptionsObjects, responseText);
                setTimeout(() => {
                    responseText.text = effective ? EffectiveText.SuperEffective : EffectiveText.NotEffective;
                    enterRunning = !enterRunning
                    currentTurn = TurnPhase.enemy;
                }, 1500)
            }
            else if (currentTurn == TurnPhase.enemy) {
                playerHealthText.currentHealth = playerModel.currentSecurityScore
                doEnemyAttack(enemyModel, playerModel);       
                makeSpriteShake(enemy);
                makeSpriteFlash(player);
                adjustPlayerHealthBar(playerHealthBar, playerModel)
                adjustPlayerHeathText(playerHealthText, playerModel)
                playerHealthText.currentHealth = playerModel.currentSecurityScore
                responseText.text = enemyModel.attacks[0].attackText.replace("%1", enemyModel.threatName).replace("%2", enemyModel.attacks[0].attackName)
                currentTurn = TurnPhase.cleanup;
                enterRunning = !enterRunning
            }
            else if (currentTurn === TurnPhase.cleanup) {
                swapDialogContents(dialogOptionsObjects, responseText);
                currentTurn = TurnPhase.player
                enterRunning = !enterRunning
            }
        }
    })

    onKeyPress(Keys.down, () => {
        if(currentTurn !== TurnPhase.player) { return; }
        play(Sounds.select, {loop: false, volume: SoundVolume})
        updateSelected(Keys.down, dialogOptionsModels)
        updateDialogAttackText(dialogOptionsObjects, dialogOptionsModels)
    })

    onKeyPress(Keys.up, () => {
        if(currentTurn !== TurnPhase.player) { return; }
        play(Sounds.select, {loop: false, volume: SoundVolume})
        updateSelected(Keys.up, dialogOptionsModels)
        updateDialogAttackText(dialogOptionsObjects, dialogOptionsModels)
    })

    onKeyPress(Keys.left, () => {
        if(currentTurn !== TurnPhase.player) { return; }
        play(Sounds.select, {loop: false, volume: SoundVolume})
        updateSelected(Keys.left, dialogOptionsModels)
        updateDialogAttackText(dialogOptionsObjects, dialogOptionsModels)
    })

    onKeyPress(Keys.right, () => {
        if(currentTurn !== TurnPhase.player) { return; }
        play(Sounds.select, {loop: false, volume: SoundVolume})
        updateSelected(Keys.right, dialogOptionsModels)
        updateDialogAttackText(dialogOptionsObjects, dialogOptionsModels)
    })

    await flashScreen({fadeIn: true});
}