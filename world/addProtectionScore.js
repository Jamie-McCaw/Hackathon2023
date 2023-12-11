const addProtectionScore = (worldState) => {
  const ps = add([
    rect(310, 75, {radius: 8}),
    pos(10, 10),
    fixed(),
    z(10000),
    opacity(0),
  ])

  ps.add([
    text('Protection Score', {font: 'pixelFont', size: 24, width: 310, align: 'center'}),
    pos(0, 10),
    fixed(),
    color(Color.fromHex(Colors.white)),
  ])

  for(let i = 0; i < 5; i++) {
    ps.add([
      rect(50, 20, {radius: 4}),
      outline(5, Color.fromHex(Colors.worldBackground)),
      pos(10 + (60 * i) , 45),
      fixed(),
      z(10000),
    ])
  }

  loadShader("invert", null, `
    uniform float u_time;

    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
      vec4 c = def_frag();
      float t = (sin(u_time * 4.0) + 1.0) / 2.0;
      return mix(c, vec4(1.0 - c.r, 1.0 - c.g, 1.0 - c.b, c.a), t);
    }
`)

  for(let i = 0; i < worldState.faintedMons.length; i++) {
    if(i === worldState.faintedMons.length - 1) {
      const newScore = ps.add([
        rect(50, 20, {radius: 4}),
        color(Color.fromHex(Colors[`colorBlock${i + 1}`])),
        outline(5, Color.fromHex(Colors.worldBackground)),
        pos(10 + (60 * i) , 45),
        fixed(),
        z(10000),
        shader("invert", () => ({
          "u_time": time(),
        })),
      ])
      setTimeout(() => {
        destroy(newScore)
        ps.add([
          rect(50, 20, {radius: 4}),
          color(Color.fromHex(Colors[`colorBlock${i + 1}`])),
          outline(5, Color.fromHex(Colors.worldBackground)),
          pos(10 + (60 * i) , 45),
          fixed(),
          z(10000),
        ])
      }, 5000)
    } else {
      ps.add([
        rect(50, 20, {radius: 4}),
        color(Color.fromHex(Colors[`colorBlock${i + 1}`])),
        outline(5, Color.fromHex(Colors.worldBackground)),
        pos(10 + (60 * i) , 45),
        fixed(),
        z(10000),
      ])
    }
  }
}