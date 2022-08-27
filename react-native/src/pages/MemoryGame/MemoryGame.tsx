import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  withSequence
} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
type Props = {};
const COLUMNS = 3;
const MEMORY_GAME_W = 300;
const MEMORY_GAME_H = 300;
const MEMORY_GAME_PIEACE_W = 296 / COLUMNS;
const MEMORY_GAME_PIEACE_H = 296 / COLUMNS;
const CENTER_HORIZONTAL = (width - MEMORY_GAME_W) / 2;
const MARGIN_TOP = 60;
const CENTER_GAME = MEMORY_GAME_W / 2;
const CENTER_RADIUS = 14;
const CENTER_PIECE = MEMORY_GAME_PIEACE_W / 2;
const BORDER_FACTOR = 2;
const RADIUS_WIN_PIECE = 40;
const dist = (a, b) => {
  'worklet';
  return Math.hypot(a.x - b.x, a.y - b.y);
};

const shuffleArray = array => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
};

const pieces = [
  {color: '#c8fd1b', position: 0},
  {color: '#f89f9f', position: 1},
  {color: '#2a58f2', position: 2},
  {color: '#61af47', position: 3},
  {color: '#7447af', position: 4},
  {color: '#af4785', position: 5},
  {color: '#af4747', position: 6},
  {color: '#555050', position: 7},
  {color: '#b595ee', position: 8}
];
let suffled = [];
let piecesSnapTo = pieces.map((e, k) => {
  const factorPositionX = k % COLUMNS;
  let piecePosition = {
    x:
      factorPositionX * MEMORY_GAME_PIEACE_W +
      CENTER_HORIZONTAL +
      BORDER_FACTOR,
    y:
      Math.floor(k / COLUMNS) * MEMORY_GAME_PIEACE_W +
      MARGIN_TOP +
      BORDER_FACTOR
  };

  let centerRadius = {
    x: piecePosition.x + CENTER_PIECE - CENTER_RADIUS / 2,
    y: piecePosition.y + CENTER_PIECE - CENTER_RADIUS / 2
  };

  let startTo = {
    x: piecePosition.x,
    y: piecePosition.y
  };
  let goTo = {
    x: piecePosition.x,
    y: piecePosition.y + MEMORY_GAME_H + 100
  };
  suffled.push(goTo);

  return {
    ...e,
    piecePosition,
    centerRadius,
    goTo,
    startTo
  };
});
suffled = shuffleArray(suffled);

piecesSnapTo = piecesSnapTo.map((e, k) => {
  return {...e, goTo: suffled[k]};
});

const BackgroundPieces = () => {
  return (
    <View
      style={{
        opacity: 0.4,
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>
      {piecesSnapTo.map(e => {
        return (
          <View
            key={e.color}
            style={{
              width: MEMORY_GAME_PIEACE_W,
              height: MEMORY_GAME_PIEACE_H,
              backgroundColor: e.color,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <View
              style={{
                borderRadius: 100,
                width: 10,
                height: 10,
                backgroundColor: 'red'
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

const PieceMemoryGame = ({piece}) => {
  const x1 = useSharedValue(piece.startTo.x);
  const y1 = useSharedValue(piece.startTo.y);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);
  const startPositionPiece = (delay = 1000) => {
    'worklet';
    scale.value = withDelay(
      delay,
      withSequence(
        withSpring(0, {}, () => {
          y1.value = piece.goTo.y;
          x1.value = piece.goTo.x;
          scale.value = withSpring(1, e => {
            if (e) {
              zIndex.value = 1;
            }
          });
        })
      )
    );
  };
  const errorPiece = (delay = 1000) => {
    'worklet';
    zIndex.value = 3;
    x1.value = withDelay(
      delay,
      withSequence(
        withTiming(x1.value - 10, {
          duration: 200
        }),
        withTiming(x1.value + 10, {
          duration: 200
        }),
        withTiming(x1.value - 10, {
          duration: 200
        }),
        withTiming(x1.value + 10, {
          duration: 200
        }),
        withTiming(
          x1.value,
          {
            duration: 200
          },
          e => {
            if (e) {
              startPositionPiece(delay);
            }
          }
        )
      )
    );
    startPositionPiece();
  };

  useEffect(() => {
    startPositionPiece();
  }, []);

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: (_, ctx) => {
        ctx.startX = x1.value;
        ctx.startY = y1.value;
        scale.value = withSpring(1.2);
        zIndex.value = 3;
      },
      onActive: (event, ctx) => {
        x1.value = ctx.startX + event.translationX;

        y1.value = ctx.startY + event.translationY;
      },
      onEnd: _ => {
        scale.value = withSpring(1);

        const distanceOfPoints = dist(
          {
            x: x1.value + CENTER_PIECE,
            y: y1.value + CENTER_PIECE
          },
          piece.centerRadius
        );
        if (distanceOfPoints <= RADIUS_WIN_PIECE) {
          x1.value = withTiming(piece.piecePosition.x);
          y1.value = withTiming(piece.piecePosition.y);
          zIndex.value = 1;
        } else {
          errorPiece(200);
        }
      }
    },
    []
  );
  const animatedXY1Props = useAnimatedProps(() => {
    return {
      zIndex: zIndex.value,
      transform: [
        {
          translateX: x1.value
        },
        {
          translateY: y1.value
        },
        {
          scale: scale.value
        }
      ]
    };
  });
  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler} maxPointers={1}>
        <Animated.View
          style={[
            {
              width: MEMORY_GAME_PIEACE_W,
              height: MEMORY_GAME_PIEACE_H,
              backgroundColor: piece.color,
              position: 'absolute',
              left: 0,
              top: 0
            },
            animatedXY1Props
          ]}
        />
      </PanGestureHandler>
    </>
  );
};
const MemoryGame = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <View
        style={{
          width: MEMORY_GAME_W,
          height: MEMORY_GAME_H,
          borderWidth: BORDER_FACTOR,
          borderColor: '#525252',
          position: 'absolute',
          left: CENTER_HORIZONTAL,
          top: MARGIN_TOP,
          backgroundColor: '#cccccc'
        }}>
        <BackgroundPieces />
      </View>
      {piecesSnapTo.map((e, k) => {
        return <PieceMemoryGame piece={e} key={k} />;
      })}
    </View>
  );
};

export default MemoryGame;
