const participants = [
  'Poonam Nigade',
  'David Hatcher',
  'Jamie McCaw',
  'Jon Eco',
  'Carlos Gomez',
];

const sprites = [
  CreatorSprites.poonam,
  CreatorSprites.david,
  CreatorSprites.jamie,
  CreatorSprites.jekko,
  CreatorSprites.carlos,
];

const generalSize = 72;

let creditsPlaying = true;

const setCredits = async (worldState = {}) => {
  setBackground(Color.fromHex(Colors.black));

  const getRowY = row => row * (height() / 10);
  const getColumnX = column => column * (width() / 24);

  participants
    .map((participant, index) => {
      const name = add([
        text(participant, {
          size: generalSize,
          width: width(),
          align: 'left',
          font: 'pixelFont',
        }),
        opacity(0),
        pos(getColumnX(8), getRowY(1.5 + 1.5 * index)),
        color(Color.fromHex(Colors.white)),
      ]);
      const avatar = name.add([
        sprite(sprites[index], {
          width: generalSize,
          height: generalSize,
        }),
        pos(-generalSize * 2, -10),
        opacity(0),
      ]);

      return { avatar, name };
    })
    .forEach(({ avatar, name }, i) => {
      const avatarDuration = 0.5;
      const nameDuration = 2;
      const delay = (avatarDuration + nameDuration) * i;
      setTimeout(() => {
        tween(
          avatar.opacity,
          1,
          avatarDuration,
          val => {
            avatar.opacity = val;
          },
          easings.easeOutSine,
        )
          .then(() => {
            animateDecryptTextOnElement(name);
            tween(
              name.opacity,
              1,
              nameDuration,
              val => {
                name.opacity = val;
              },
              easings.easeOutSine,
            );
          })
          .then(() => {
            if (i === participants.length - 1) {
              creditsPlaying = false;
            }
          });
      }, delay * 1000);
    });

  onKeyPress('space', async () => {
    if (creditsPlaying) return;
    await flashScreen({ fadeIn: false, seconds: 1 });
    go(SceneNames.creditsCC, worldState);
  });

  await flashScreen({ fadeIn: true, seconds: 2 });
};
