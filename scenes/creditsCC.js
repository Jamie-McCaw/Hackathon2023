const setCreditsCC = async (worldState = {}) => {
  setBackground(Color.fromHex(Colors.black));

  const getRowY = row => row * (height() / 10);

  add([
    text('Credits', {
      size: 32,
      width: width(),
      align: 'center',
      font: 'pixelFont',
    }),
    pos(0, getRowY(0.5)),
    color(Color.fromHex(Colors.white)),
  ]);

  createText(
    {
      textContent: 'Game Engine',
      textContent2: 'KaboomJS',
      width: width() / 4,
      posY: getRowY(1.333),
      fontColor: Color.fromHex(Colors.white),
      data: {},
    },
    { screenWidth: width() },
  );
  add([
    text('Sound / Music', {
      size: 32,
      width: width(),
      align: 'center',
      font: 'pixelFont',
    }),
    pos(0, getRowY(2.5)),
    color(Color.fromHex(Colors.white)),
  ]);

  createText(
    {
      textContent: 'Cyberpunk Moonlight Sonata',
      textContent2: 'Joth - OpenGameArt',
      width: width() / 4,
      posY: getRowY(3.333),
      fontColor: Color.fromHex(Colors.white),
      data: {},
    },
    { screenWidth: width() },
  );
  createText(
    {
      textContent: 'The Adventure Begins',
      textContent2: 'bart - OpenGameArt',
      width: width() / 4,
      posY: getRowY(4.333),
      fontColor: Color.fromHex(Colors.white),
      data: {},
    },
    { screenWidth: width() },
  );

  add([
    text('Sprites / Art', {
      size: 32,
      width: width(),
      align: 'center',
      font: 'pixelFont',
    }),
    pos(0, getRowY(5.333)),
    color(Color.fromHex(Colors.white)),
  ]);

  createText(
    {
      textContent: 'Exploit Eagan Sprite',
      textContent2: 'Eagan Rackley',
      width: width() / 4,
      posY: getRowY(6.333),
      fontColor: Color.fromHex(Colors.white),
      data: {},
    },
    { screenWidth: width() },
  );
  createText(
    {
      textContent: 'City Tileset',
      textContent2: 'Yanin - itch.io',
      width: width() / 4,
      posY: getRowY(6.833),
      fontColor: Color.fromHex(Colors.white),
      data: {},
    },
    { screenWidth: width() },
  );
  createText(
    {
      textContent: 'Main character sprite',
      textContent2: 'AxulArt - itch.io',
      width: width() / 4,
      posY: getRowY(7.333),
      fontColor: Color.fromHex(Colors.white),
      data: {},
    },
    { screenWidth: width() },
  );
  createText(
    {
      textContent: 'All other sprites / art',
      textContent2: 'Jon "Jekko" Eco',
      width: width() / 4,
      posY: getRowY(7.833),
      fontColor: Color.fromHex(Colors.white),
      data: {},
    },
    { screenWidth: width() },
  );

  onKeyPress('space', async () => {
    await flashScreen({ fadeIn: false, seconds: 1 });
    go(SceneNames.theEnd, worldState);
  });

  await flashScreen({ fadeIn: true, seconds: 2 });
};

function createText(
  {
    textContent,
    textContent2,
    width,
    posY,
    fontSize = 24,
    fontColor = Color.fromHex(Colors.worldBackground),
    data,
  },
  options,
) {
  const getColumnX = column => column * (options.screenWidth / 24);

  const textElement = add([
    text(textContent, {
      size: fontSize,
      width: width,
      align: 'right',
      font: 'pixelFont',
    }),
    pos(getColumnX(3), posY),
    color(fontColor),
    {
      data,
    },
  ]);

  const textElement2 = add([
    text(textContent2, {
      size: fontSize,
      width: width,
      align: 'left',
      font: 'pixelFont',
    }),
    pos(getColumnX(14), posY),
    color(fontColor),
    {
      data,
    },
  ]);

  return [textElement, textElement2];
}
