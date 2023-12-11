kaboom({
	width: 1280,
	height: 720,
})

setBackground(Color.fromHex(Colors.background))

loadAssets()
getFont('pixelFont')  

const scenes = {
  [SceneNames.intro]: setIntro, 
  [SceneNames.world]: setWorld,
  [SceneNames.battle]: setBattle,
  [SceneNames.glossary]: setGlossary,
  [SceneNames.credits]: setCredits,
  [SceneNames.creditsCC]: setCreditsCC,
  [SceneNames.theEnd] : setTheEnd
};

Object.entries(scenes).forEach(sceneData => scene(...sceneData));

go(SceneNames.intro)
