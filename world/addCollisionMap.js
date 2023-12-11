const addCollisionMap = () => {
  addLevel([
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '      111111111111111111111111                     ',
    '   111                        1  111111111    1    ',
    '  1                           1 1         1111 1111',
    '  1        111111111111111    1 1                 1',
    '  1        1             1    1 1         1111    1',
    '  1     111              1    1 1        1   1    1',
    '  1     1                1    1 1     111    1    1',
    '  1     1                1    1 1     1      1    1',
    '  1     1                1    1 1     1      1    1',
    '  1     1                1    1 1     1      1    1',
    '  1     1                1    1 1     1      1    1',
    '  1    11111111111 1111  1    1 1     1      1    1',
    '  1               1    1 1    111     1      1    1',
    '  1                    1 1            1      1    1',
    '  1                    1 1            1      1    1',
    '  1   111111111111111  1  111111111111       1    1',
    '  1   1             1  1                     1    1',
    '  1   1             1  1                     1    1',
    '  1   1             1  1                     1    1',
    '  1   1             1  1                     1    1',
    '  1   1             1  1                     1    1',
    '  1   1             1  1                     1    1',
    '  1   1             1  1                     1    1',
    '  1   111111111111111  11111111   1 11       1    1',
    '  1   1                        111 1  1      1    1',
    '  1                                   1      1    1',
    '  1                                   1      1    1',
    '  1     1    1  11111  11111      1   1      1 1 11',
    '   1111111111111    1  1    1111111111        1 1  ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1  1                           ',
    '                    1111                           ',
  ],
  {
    tileWidth: 32,
    tileHeight: 32,
    tiles: {
      '1': () => [
        area({
          shape: new Rect(vec2(), 24, 24),
          offset: vec2(4, 0),
        }),
        body({isStatic: true})
      ],
    }
  }
  )
}