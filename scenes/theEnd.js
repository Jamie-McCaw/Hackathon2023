async function setTheEnd(worldState) {
    setBackground(BLACK);
    setGravity(1200);
    if (!worldState) {
        worldState = {}
    }
    worldState.currentWorldScene = SceneNames.theEnd;
    let creatorStartX = center().x - 100;
    const textTheEnd = add([
        text('[wavy]Thanks for playing our game![/wavy]', {
            font: 'pixelFont',
            size: 54,
            styles: {
                wavy: (idx, ch) => ({
                    color: WHITE,
                    pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5))
                })
            },
        }),
        pos(center().x, center().y - 125),
        color(WHITE),
        anchor('center')
    ])

    const scanSummaryButtons = add([        
        sprite(WorldSprites.scanSummaryControl),
        pos(center().x - width()/3, center().y + height()/2),
        scale(1),
        opacity(1),
        anchor('center'),
        {
            name: 'bruteForceSherwood',
            isAnimating: false,
            chosenLast: false,
        }
    ])

    const bruteForceSherwood = add([        
        sprite(WorldSprites.bruteForceSherwood, {flipX: true}),
        pos(center().x - 550,center().y - 25),
        scale(5),
        opacity(1),
        anchor('center'),
        {
            name: 'bruteForceSherwood',
            isAnimating: false,
            chosenLast: false,
        }
    ])

    const nigerianPrinceJohn = add([        
        sprite(WorldSprites.nigerianPrinceJohn),
        pos(center().x + 550,center().y - 25),
        scale(5),
        opacity(1),
        anchor('center'),
        {
            name: 'nigerianPrinceJohn',
            isAnimating: false,
            chosenLast: false,
        }
    ])

    const trackerChuck = add([        
        sprite(WorldSprites.trackerChuck),
        pos(center().x - 400,center().y - 275),
        scale(5),
        opacity(1),
        anchor('center'),
        {
            name: 'trackerChuck',
            isAnimating: false,
            chosenLast: false,
        }
    ])

    const malwareMark = add([        
        sprite(WorldSprites.malwareMark),
        pos(center().x + 400,center().y - 275),
        scale(5),
        opacity(1),
        anchor('center'),
        {
            name: 'malwareMark',
            isAnimating: false,
            chosenLast: false,
        }
    ])

    const exploitEagan = add([        
        sprite(WorldSprites.exploitEagan),
        pos(center().x,center().y - 275),
        scale(5),
        opacity(1),
        anchor('center'),
        {
            name: 'exploitEagan',
            isAnimating: false,
            chosenLast: false,
        }
    ])

    const floor = add([
        rect(width(), 1),
        pos(center().x, center().y + 200),
        color(BLACK),
        body({isStatic: true}),
        anchor('top'),
        area()
    ])

    const marc1n = add([        
        sprite(BattleSprites.marc1n, { flipX: true }),
        pos(creatorStartX -400, floor.pos.y),
        scale(1),
        opacity(1),
        anchor('center'),
        body(),
        area(),
        {
            chosenLast: false,
            direction: 'none'
        }
    ])
    
    const carlos = add([        
        sprite(CreatorSprites.carlos, { flipX: false }),
        pos(creatorStartX, floor.pos.y),
        scale(5),
        opacity(1),
        anchor('center'),
        body(),
        area(),
        {
            name: 'carlos',
            chosenLast: false
        }
    ])

    const jamie = add([        
        sprite(CreatorSprites.jamie, { flipX: false }),
        pos(creatorStartX + 50, floor.pos.y),
        scale(5),
        opacity(1),
        anchor('center'),
        body(),
        area(),
        {
            name: 'jamie',
            chosenLast: false
        }
    ])

    const poonam = add([        
        sprite(CreatorSprites.poonam, { flipX: false }),
        pos(creatorStartX + 100, floor.pos.y),
        scale(5),
        opacity(1),
        anchor('center'),
        body(),
        area(),
        {
            name: 'poonam',
            chosenLast: false
        }
    ])

    const jekko = add([        
        sprite(CreatorSprites.jekko, { flipX: false }),
        pos(creatorStartX + 150, floor.pos.y),
        scale(5),
        opacity(1),
        anchor('center'),
        body(),
        area(),
        {
            name: 'jekko',
            chosenLast: false
        }
    ])

    const david = add([        
        sprite(CreatorSprites.david, { flipX: false }),
        pos(creatorStartX + 200, floor.pos.y),
        scale(5),
        opacity(1),
        anchor('center'),
        body(),
        area(),
        {
            name: 'david',
            chosenLast: false
        }
    ])

    let enemySprites = [bruteForceSherwood, nigerianPrinceJohn, trackerChuck, malwareMark, exploitEagan];
    let creatorSprites = [carlos, jamie, poonam, jekko, david];
    
    setInterval(() => {
        // Shake enemy
        let enemyToMove = enemySprites[Math.floor(Math.random()*enemySprites.length)]
        while (enemyToMove.chosenLast) {
            enemyToMove = enemySprites[Math.floor(Math.random()*enemySprites.length)];
        }
        makeSpriteShakeTwice(enemyToMove)
        for(enemy of enemySprites)
        {
            if(enemy.name !== enemyToMove.name) {
                enemy.chosenLast = false;
            } else if (enemy == enemyToMove) {
                enemy.chosenLast = true;
            }
        }        
    }, 2000)

    let tick = 0
    let jumpedForLeft = false;
    let jumpedForRight = false;
    onUpdate(() => {
        let jumpDistance = 200;
        if(marc1n.direction !== 'none' && carlos.isGrounded() && david.isGrounded()) {
            if(marc1n.direction === 'left' && marc1n.pos.x - david.pos.x < jumpDistance) {                
                if(!jumpedForLeft) {
                    jumpCreators(creatorSprites, false)
                    jumpedForLeft = true;
                    jumpedForRight = false;
                }
            } else if (marc1n.direction === 'right' && carlos.pos.x - marc1n.pos.x < jumpDistance) {
                if (!jumpedForRight) {
                    jumpCreators(creatorSprites, true);
                    jumpedForRight = true;
                    jumpedForLeft = false;
                }
            }
        }
        tick++
    })

    let marcinMovingToggle = true
    setInterval(() => {
        moveMarcin(marc1n, marcinMovingToggle)
        marcinMovingToggle = !marcinMovingToggle
    }, 3000)

    onKeyPress(Keys.escape, () => {
        worldState.latestScreenshot = screenshot();
        go(SceneNames.glossary, worldState)
    })

}

const makeSpriteShakeTwice = (sprite) => {
    if(sprite.isAnimating) {
        return;
    }
    sprite.isAnimating = true
    makeSpriteShake(sprite,true)
    setTimeout(() => {
        makeSpriteShake(sprite,false)
        sprite.isAnimating = false
    }, 200)
}

const getRandomSprite = (sprites) => {
    let currentChosen = sprites[Math.floor(Math.random()*sprites.length)];
    while(currentChosen.chosenLast) {
        currentChosen = sprites[Math.floor(Math.random()*sprites.length)];        
    }
    return currentChosen;
}

const moveMarcin = (marcin, leftToRight) => {
    let newPositionValue = leftToRight ? 1000 : - 1000;
    marcin.flipX = !marcin.flipX
    marcin.direction = leftToRight ? 'right' : 'left';
    tween(
        marcin.pos.x,
        marcin.pos.x + newPositionValue,
        1.8,
        (val) =>  { marcin.pos.x = val },
        easings.linear
    ).then(() => {
        marcin.direction = 'none';
    })
    
}

const jumpCreators = (creatorSprites, reversed) => {
    let delay = 3;
    let i = 0;
    let jumpInterval;
    jumpInterval = setInterval(() => {
        delay = i === 0 ? 0 : 100;
        let playerToJump = reversed ? creatorSprites.reverse()[i] : creatorSprites[i]
        if(playerToJump.isGrounded()) {
            playerToJump.play('jump')
            playerToJump.jump(800);
            playerToJump.flipX = !playerToJump.flipX
        }
        i++;
        if(i > creatorSprites.length - 1) {
            clearInterval(jumpInterval)
        }
    }, delay)      
}