const flashScreen = async ({fadeIn, seconds = 1} = {}) => {
  const flash = add([rect(1280, 720), color(10,10,10), fixed(), opacity(fadeIn ? 1 : 0), z(11000)])
  await tween(flash.opacity, fadeIn ? 0 : 1, seconds, (val) => flash.opacity = val, easings.easInBounce)
}

const possibleSymbols = '0123456789abcdefghijklnopqrstuvxyz!#$%&'.split('');
const encryptText = text =>
  text
    .split('')
    .map(l =>
      l === ' '
        ? ' '
        : possibleSymbols[
            Math.floor(
              Math.random() *
                possibleSymbols.filter(c => c !== l.toLowerCase()).length,
            )
          ],
    )
    .join('');

const changeLettersTimeout = (element, newText, multiplier) => {
  const initialDelay = 150;
  const sequenceInterval = 150;
  setTimeout(
    () => (element.text = newText),
    initialDelay + sequenceInterval * multiplier,
  );
};

const animateDecryptTextOnElement = (element, { staticName = false } = {}) => {
  const finalText = element.text;
  const staticSymbols = encryptText(finalText);
  element.text = encryptText(finalText);
  for (let i = 0; i < finalText.length; i++) {
    const dynamicSymbols = encryptText(element.text.slice(i + 1));
    const encryptedPart = staticName
      ? staticSymbols.slice(i + 1)
      : dynamicSymbols;
    changeLettersTimeout(element, finalText.slice(0, i + 1) + encryptedPart, i);
  }
};


const addWorldMusic = (worldState) => {
  if (!worldState.worldMusic) {
    worldState.worldMusic = play(Sounds.worldMusic, { loop: true, volume: 0});
    tween(worldState.worldMusic.volume, SoundVolume / 2, 3, (val) => worldState.worldMusic.volume = val, easings.easeInQuad)
    return;
  }

  if (!worldState.keepWorldMusicVolume) worldState.worldMusic.volume = 0
  
  worldState.keepWorldMusicVolume = false
  worldState.worldMusic.paused = false
  tween(worldState.worldMusic.volume, SoundVolume / 2, 3, (val) => worldState.worldMusic.volume = val, easings.easeInQuad)
}