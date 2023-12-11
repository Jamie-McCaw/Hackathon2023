const TEXT = {
  title: 'MalwareBytes Scan Summary',
  name: 'Threat Name',
  threats: 'Threats',
  found: 'Threats Detected:',
  down: 'Threats Down:',
  nameUnknown: '??????',
  descriptionUnknown:
    'Quarantine the threat to unlock more information about it.',
  selectionCaret: '>> ',
};

const backgroundColor = Colors.background;
const borderSize = 4;
const textSize = 24;
const sceneRatio = 1 / window.devicePixelRatio;

const enemiesObject = getEnemies();
const enemyEntries = Object.entries(enemiesObject).filter(e => e[1].usable);

const knownDownedThreats = [];

const setGlossary = async (worldState = {}) => {
  add([
    rect(width(), height(), { radius: 0 }),
    pos(0, 0),
    color(Color.fromHex(backgroundColor)),
    z(-1),
    {
      background: true,
    },
  ]);

  const sceneAnimation = easings.easeOutBounce;

  let selectThreat = 0;

  const { faintedMons: downedThreats = [] } = worldState;
  const foundThreatsCount = enemyEntries.length;
  const downedThreatsCount = downedThreats.length;

  const columnWidth = width() / 24;
  const getColumnX = column => column * columnWidth;
  const rowHeight = height() / 10;
  const getRowY = row => row * rowHeight;

  const encryptedNames = enemyEntries.map(([enemyType, enemyData]) =>
    downedThreats.includes(enemyType)
      ? enemyData.threatName
      : encryptText(enemyData.threatName),
  );

  // Title and Name
  const [_, threatPicture, ...threatNames] = createTextBoxes([
    {
      textContent: TEXT.title,
      width: width() + borderSize,
      height: rowHeight,
      posX: -borderSize / 2,
      posY: -borderSize / 2,
    },
    {
      textContent: '?',
      width: columnWidth * 8,
      height: rowHeight * 3,
      posX: getColumnX(0.5),
      posY: getRowY(3),
      border: 0,
      fontSize: textSize * 4,
      backgroundColor: backgroundColor,
    },
    ...enemyEntries.map(([enemyType, enemyData], index) => ({
      textContent: encryptedNames[index],
      width: columnWidth * 8,
      height: rowHeight,
      posX: getColumnX(0.5),
      posY: getRowY(1.5),
      setOpacity: 0,
      data: {
        enemyType,
        ...enemyData,
      },
    })),
  ]);

  // Threat count
  createTextBoxes([
    {
      textContent: '',
      width: columnWidth * 8 + borderSize,
      height: rowHeight * 2 + borderSize,
      posX: getColumnX(0.5) - borderSize / 2,
      posY: height() - getRowY(3) - borderSize / 2,
    },
    {
      textContent: TEXT.found,
      width: columnWidth * 6,
      height: rowHeight,
      posX: getColumnX(0.5),
      posY: height() - getRowY(3),
      textAlign: 'left',
      border: 0,
    },
    {
      textContent: foundThreatsCount,
      width: columnWidth * 2,
      height: rowHeight,
      posX: getColumnX(6),
      posY: height() - getRowY(3),
      textAlign: 'right',
      border: 0,
    },
    {
      textContent: TEXT.down,
      width: columnWidth * 6,
      height: rowHeight,
      posX: getColumnX(0.5),
      posY: height() - getRowY(2),
      textAlign: 'left',
      border: 0,
    },
    {
      textContent: Math.min(5, downedThreatsCount),
      width: columnWidth * 2,
      height: rowHeight,
      posX: getColumnX(6),
      posY: height() - getRowY(2),
      textAlign: 'right',
      border: 0,
    },
  ]);

  // Threat list
  const [__, description, ___, ...threatList] = createTextBoxes([
    {
      textContent: '',
      width: columnWidth * 14 + borderSize,
      height: rowHeight * 7.5 + borderSize,
      posX: width() - getColumnX(14.5) - borderSize / 2,
      posY: getRowY(1.5) - borderSize / 2,
    },
    {
      textContent: '',
      isParagraph: true,
      width: columnWidth * 8 + borderSize,
      height: rowHeight * 7.5 + borderSize,
      posX: width() - getColumnX(8.5) + borderSize / 2,
      posY: getRowY(1.5) - borderSize / 2,
    },
    {
      textContent: '',
      isParagraph: true,
      width: 4,
      height: rowHeight * 7.5 + borderSize,
      posX: width() - getColumnX(8.5) + borderSize / 2,
      posY: getRowY(1.5) - borderSize / 2,
    },
    ...enemyEntries.map(([enemyType, enemyData], index) => ({
      textContent: encryptedNames[index],
      width: columnWidth * 6,
      height: rowHeight * 0.5,
      posX: width() - getColumnX(14.5),
      posY: getRowY(1 + 0.7 * ++index) + 10,
      border: 0,
      textAlign: 'left',
      fontSize: textSize * 0.75,
      data: {
        enemyType,
        ...enemyData,
      },
    })),
  ]);

  const currentEnemyData = threatList[selectThreat].boxElement.data;
  let currentEnemySprite = null;

  updateSelection(-1, selectThreat);

  function updateSelection(previous, current) {
    if (previous === current) return;
    if (previous >= 0) {
      threatList[previous].textElement.pos = threatList[
        previous
      ].textElement.pos.sub(22, 0);
      threatList[previous].textElement.children.forEach(c => c.destroy());
      threatList[previous].textElement.color = Color.fromHex(
        Colors.worldBackground,
      );

      threatNames[previous].boxElement.opacity = 0;
      threatNames[previous].textElement.opacity = 0;
    }

    threatList[current].textElement.pos = threatList[
      current
    ].textElement.pos.add(22, 0);

    threatNames[current].boxElement.opacity = 1;
    threatNames[current].textElement.opacity = 1;

    threatList[current].textElement.add([
      text('>> ', {
        size: textSize * 0.75,
        width: 22,
        align: 'left',
        font: 'pixelFont',
        transform: (idx, ch) => ({
          color: hsl2rgb(
            wave(0, 1, (time() * 1 + (10 - idx) * 0.1) % 1),
            0.7,
            0.8,
          ),
        }),
      }),
      pos(-22, 0),
      color(Color.fromHex(Colors.background)),
      opacity(1),
    ]);
    threatList[current].textElement.color = Color.fromHex(Colors.background);

    description.textElement.text = downedThreats.includes(
      threatList[current].boxElement.data.type,
    )
      ? enemyEntries[current][1].description || TEXT.descriptionUnknown
      : TEXT.descriptionUnknown;

    threatList.forEach(({ boxElement }, index) => {
      if (checkIfFreshDownedEnemy(downedThreats, boxElement.data.enemyType)) {
        knownDownedThreats.push(boxElement.data.enemyType);
        animateDecryptTextOnElement(threatNames[index].textElement);
        animateDecryptTextOnElement(threatList[index].textElement);
      }
    });

    currentEnemySprite?.destroy();
    const enemyData = threatList[current].boxElement.data;
    threatPicture.textElement.text = '?';

    if (enemyData.usable && enemyData.imageLarge) {
      threatPicture.textElement.text = '';
      currentEnemySprite = createEnemySprite(
        enemyData,
        downedThreats,
        threatPicture.boxElement,
      );
    }
  }

  if (worldState.latestScreenshot) {
    const sceneAnimations = get('*').map(obj => {
      obj.pos.y += 720;
      return tween(
        obj.pos.y,
        obj.pos.y - 720,
        0.5,
        val => {
          obj.pos.y = val;
        },
        sceneAnimation,
      );
    });

    loadSprite('worldScreenshot', worldState.latestScreenshot);
    add([
      sprite('worldScreenshot'),
      pos(0, 0),
      z(-2),
      scale(sceneRatio),
      {
        screenshot: true,
      },
      'worldScreenshot',
    ]);

    await Promise.all(sceneAnimations);
  }

  let isAnimating = false;

  onKeyPress('down', () => {
    if (isAnimating) return;
    const previousSelected = selectThreat;
    selectThreat = Math.min(enemyEntries.length - 1, selectThreat + 1);
    updateSelection(previousSelected, selectThreat);
  });

  onKeyPress('up', () => {
    if (isAnimating) return;
    const previousSelected = selectThreat;
    selectThreat = Math.max(0, selectThreat - 1);
    updateSelection(previousSelected, selectThreat);
  });

  onKeyPress('escape', async () => {
    if (isAnimating) return;
    isAnimating = true;
    const sceneAnimations = get('*').map(obj => {
      if (!obj.pos) obj.destroy();
      if (!obj.screenshot && obj.pos) {
        return tween(
          obj.pos.y,
          obj.pos.y + 720,
          0.5,
          val => {
            obj.pos.y = val;
          },
          sceneAnimation,
        );
      }
    });

    Promise.all(sceneAnimations).then(() => {
      isAnimating = false;
      worldState.keepWorldMusicVolume = true;
      if (worldState.currentWorldScene === SceneNames.theEnd) {
        go(worldState.currentWorldScene, worldState);
      } else {
        go(SceneNames.world, worldState);
      }
    });
  });
};

function createTextBox({
  textContent,
  boxTitle = '',
  width,
  height,
  posX,
  posY,
  fontSize = textSize,
  textAlign = undefined,
  border = borderSize,
  backgroundColor = Color.fromHex(Colors.white),
  fontColor = Color.fromHex(Colors.worldBackground),
  isParagraph = false,
  setOpacity = 1,
  data,
}) {
  const boxElement = add([
    rect(width, height, { radius: 8 }),
    pos(posX, posY),
    border && outline(border, Color.fromHex(Colors.worldBackground)),
    color(backgroundColor),
    opacity(setOpacity),
    {
      data,
    },
  ]);

  const textElement = add([
    text(textContent, {
      size: isParagraph ? fontSize / 1.25 : fontSize,
      width: width - (isParagraph ? 40 : 0),
      align: textAlign || 'center',
      font: 'pixelFont',
      transform: (idx, ch) => ({
        color: hsl2rgb(
          wave(0, 1, (time() * 1 + (10 - idx) * 0.1) % 1),
          0.7,
          0.8,
        ),
      }),
    }),
    pos(
      boxElement.pos.add(
        textAlign ? 10 : isParagraph ? 20 : 0,
        isParagraph ? 30 : boxElement.height / 2 - fontSize / 2 + border / 2,
      ),
    ),
    color(fontColor),
    opacity(setOpacity),
    {
      data,
    },
  ]);

  if (boxTitle) {
    add([
      text(boxTitle, {
        size: fontSize,
        width: width,
        align: textAlign || 'center',
        font: 'pixelFont',
      }),
      pos(boxElement.pos.add(0, -fontSize)),
      color(fontColor),
      opacity(setOpacity),
    ]);
  }
  return { boxElement, textElement };
}

function createTextBoxes(textBoxConfigs) {
  return textBoxConfigs.map(createTextBox);
}

function createEnemySprite(enemyData, downedThreats, parent) {
  const { imageLarge: image, type } = enemyData;
  if (!image) return;

  const isDowned = downedThreats.includes(type);

  const enemyPixelSize = 300;

  const isFreshDownedEnemy = checkIfFreshDownedEnemy(
    downedThreats,
    enemyData.type,
  );

  const baseEnemySprite = add([
    sprite(image, {
      width: enemyPixelSize,
      height: enemyPixelSize,
    }),
    opacity(1),
    fadeIn(isDowned && isFreshDownedEnemy ? 0 : 0.3),
    color(Color.fromHex(Colors.black)),
    pos(
      parent.pos.add(
        (parent.width - enemyPixelSize) / 2,
        (parent.height - enemyPixelSize) / 2,
      ),
    ),
  ]);

  if (isDowned || isFreshDownedEnemy) {
    baseEnemySprite.add([
      sprite(image, {
        width: enemyPixelSize,
        height: enemyPixelSize,
      }),
      opacity(1),
      fadeIn(isFreshDownedEnemy ? 0.7 : 0.2),
    ]);
  }

  return baseEnemySprite;
}

function checkIfFreshDownedEnemy(downedThreats, type) {
  return downedThreats.includes(type) && !knownDownedThreats.includes(type);
}
