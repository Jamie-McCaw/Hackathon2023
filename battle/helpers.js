const getEnemyDamage = (enemy) => {
    let attack = enemy.attacks[0];
    return Math.random() * (attack.maxDamage - attack.minDamage) + attack.minDamage;
}

const getPlayerDamage = (attack, enemy) => {
    let effective = attack.effectiveAgainst.includes(enemy.type);
    if(effective)
    {
        return attack.effectiveDamage;
    }
    
    return 0;
}

const updateDialogAttackText = (dialogOptionsObjects, dialogOptionsModels) => {
    for (key in dialogOptionsObjects) {
        dialogOptionsObjects[key].text = (dialogOptionsModels[key].selected ? "> " : "") + dialogOptionsModels[key].text
    }
}

const getSelected = (dialogOptionsModels) => {
    for (key in dialogOptionsModels) {
        if (dialogOptionsModels[key].selected) {
            return key;
        }
    }
}

const setSelected = (newSelection, dialogOptionsModels) => {
    for (key in dialogOptionsModels) {
        dialogOptionsModels[key].selected = newSelection == key
    }
}

const updateSelected = (keyPressed, dialogOptionsModels) => {
    let currentSelected = getSelected(dialogOptionsModels);
    let newSelected = getNewSelection(currentSelected, keyPressed);
    setSelected(newSelected, dialogOptionsModels);
}

const getNewSelection = (oldSelection, keyPressed) => {
    // On down/up if we're in the top row, 1 or two, we need to go down
    // otherwise we need to go up
    if (keyPressed === Keys.down || keyPressed === Keys.up) {
        return +oldSelection + (oldSelection > 2 ? -2 : 2);
    }
    // On left/right if we're on the right side (even) we need to go left
    // if we're on the left side we need to go right
    else if (keyPressed === Keys.right || keyPressed === Keys.left) {
        return +oldSelection + (oldSelection % 2 === 0 ? -1 : 1);
    }
}

const doPlayerAttack = (selectedAttack, dialogOptionsObjects, dialogResponseText, enemyModel) => {
    let damage = getPlayerDamage(selectedAttack, enemyModel);
    enemyModel.currentHealth -= damage;
    let responseText = damage > 0 ? EffectiveText.SuperEffective : EffectiveText.NotEffective;
    dialogResponseText.text = selectedAttack.attackText;
    return damage > 0;
}

const swapDialogContents = (dialogOptionsObjects, dialogResponseText) => {
    for (let key in dialogOptionsObjects) {
        dialogOptionsObjects[key].opacity = dialogOptionsObjects[key].opacity === 0 ? 1 : 0;
    }
    dialogResponseText.opacity = dialogResponseText.opacity === 0 ? 1 : 0
}

const doEnemyAttack = (enemyModel, playerModel) => {
    let damage = getEnemyDamage(enemyModel);
    play(Sounds.enemyAttack, { loop: false, volume: 0.1})
    playerModel.currentSecurityScore -= damage;
}

const makeSpriteFlash = (spriteObject) => {
    tween(
        spriteObject.opacity,
        0,
        0.3,
        (val) => {
            spriteObject.opacity = val
            if (spriteObject.opacity === 0) {
                spriteObject.opacity = 1
            }
        },
        easings.easeInBounce
    )
}


const makeSpriteShake = (spriteObject, leftToRight = false) => {
    let movementValue = leftToRight ? -12 : 12
    tween(
        spriteObject.pos.x,
        spriteObject.pos.x + movementValue,
        0.1,
        (val) =>  { spriteObject.pos.x = val },
        easings.linear
    ).then(() => {
        tween(
            spriteObject.pos.x,
            spriteObject.pos.x - movementValue,
            0.1,
            (val) =>  { spriteObject.pos.x = val },
            easings.linear
        )
    })
}

const moveDialogToCenter = (dialogObject) => {
    tween(
        dialogObject.pos.y,
        center().y,
        1,
        (val) =>  { dialogObject.pos.y = val },
        easings.linear
    )
}

const fadeInDialog = (dialogObject, text) => {
    tween(
        dialogObject.opacity,
        1,
        .7,
        (val) =>  { dialogObject.opacity = val },
        easings.easeInBounce
    )
    tween(
        text.opacity,
        1,
        .7,
        (val) =>  { text.opacity = val },
        easings.easeInBounce
    )
}

const threatDownEnemy = (enemy, threatDown) => {
    tween(
        threatDown.pos.y,
        enemy.pos.y,
        0.5,
        (val) =>  { threatDown.pos.y = val },
        easings.linear
    ).then(() => {
        tween(
            enemy.pos.y,
            1000,
            0.5,
            (val) =>  { enemy.pos.y = val },
            easings.linear
        )
    })
}

const getPlayerAttackModels = (playerModel) => {
    let models = {
        1: {
        action: playerModel.attacks[0],
        selected: true,
        text: playerModel.attacks[0].attackName,
        pos: 0
        },
        2: {
        action: playerModel.attacks[1],
        text: playerModel.attacks[1].attackName,
        selected: false,
        pos: 1
        },
        3: {
        action: playerModel.attacks[2],
        text: playerModel.attacks[2].attackName,
        selected: false,
        pos: 2
        },
        4: {
        action: playerModel.attacks[3],
        text: playerModel.attacks[3].attackName,
        selected: false,
        pos: 3
        }
    }

    return models;
}

const fadeInObject = (object, duration, easing) => {
    tween(
        object.opacity,
        1,
        duration,
        (val) =>  { object.opacity = val },
        easing
    )
}

const fadeOutObject = (object, duration, easing) => {
    tween(
        object.opacity,
        0,
        duration,
        (val) =>  { object.opacity = val },
        easing
    )
}

const flashObject = (object, durationInSeconds) => {
    setTimeout(() => {
        object.opacity = 1;
    }, durationInSeconds * 1000/7)
    setTimeout(() => {
        object.opacity = 0;
    }, 2 * durationInSeconds * 1000/7)
    setTimeout(() => {
        object.opacity = 1;        
    }, 3 * durationInSeconds * 1000/7)
    setTimeout(() => {
        object.opacity = 0;
    }, 4 * durationInSeconds * 1000/7)
    setTimeout(() => {
        object.opacity = 1;
    }, 5 * durationInSeconds * 1000/7)
    setTimeout(() => {
        object.opacity = 0;
    }, 6 * durationInSeconds * 1000/7)
    setTimeout(() => {
        object.opacity = 1;
    }, 7 * durationInSeconds * 1000/7)
}

const adjustPlayerHealthBar = (healthBar, playerModel) => {
    tween(
        healthBar.width,
        playerModel.currentSecurityScore * 3,
        0.1,
        (val) => { healthBar.width = val },
        easings.lienar
    )
}

const adjustPlayerHeathText = (healthText, playerModel) => {
    tween(
        healthText.currentHealth,
        playerModel.currentSecurityScore,
        0.3,
        (val) => { healthText.text = "HP: " + parseInt(val)},
        easings.linear
    )
}