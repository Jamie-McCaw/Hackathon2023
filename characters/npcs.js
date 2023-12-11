let npcs = {
  [Npcs.David] : {
      message : ["Look mom, I'm in a video game!", "This arcade machine doesn't work by the way."],
      npcName : "David",
      imageSmall : WorldSprites.david,
      location : {
          x : 543.659,
          y : 472
      }
  },
  [Npcs.Jamie] : {
    message : ["I wonder if I'll ever get my ideabytes shirt...?", "Anyway, I hope you clean up all the threats here.", "It would suck to have to come back later."],
    npcName : "Jamie",
    imageSmall : WorldSprites.jamie,
    location : {
        x : 220,
        y : 856
    }
  },
  
  [Npcs.Jon] : {
    message : ["Oh man, this food is so good!", "By the way, be careful if you keep going that way.", "There's this suspiciously nice guy blocking the bridge."],
    npcName : "Jon",
    imageSmall : WorldSprites.jon,
    location : {
        x : 513,
        y : 120
    }
  },
  [Npcs.Poonam] : {
    message : ["Thank you so much for getting rid of them!", "They wouldn't stop spamming me.", "I don't know what a Nigerian Prince would want with me."],
    npcName : "Poonam",
    imageSmall : CreatorSprites.poonam,
    location : {
        x : 1188,
        y : 856
    }
  },
  [Npcs.Carlos] : {
    message : ["Awww, they don't have any water in this vending machine.", "Oh well, I'll just have to continue my run."],
    npcName : "Carlos",
    imageSmall : WorldSprites.carlos,
    location : {
        x : 124,
        y : 152
    }
  }
}

let getNpcs = () => {
  return npcs;
}