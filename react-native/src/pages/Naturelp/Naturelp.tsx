import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

type Props = {};
const data = [
  {
    title: 'Mountain',
    image:
      'https://i.picsum.photos/id/1019/5472/3648.jpg?hmac=2mFzeV1mPbDvR0WmuOWSiW61mf9DDEVPDL0RVvg1HPs'
  },
  {
    title: 'Mountain Green',
    image:
      'https://i.picsum.photos/id/1018/3914/2935.jpg?hmac=3N43cQcvTE8NItexePvXvYBrAoGbRssNMpuvuWlwMKg'
  },
  {
    title: 'White Ice',
    image:
      'https://i.picsum.photos/id/1021/2048/1206.jpg?hmac=fqT2NWHx783Pily1V_39ug_GFH1A4GlbmOMu8NWB3Ts'
  },
  {
    title: 'Green of Soul',
    image:
      'https://i.picsum.photos/id/1022/6000/3376.jpg?hmac=FBA9Qbec8NfDlxj8xLhV9k3DQEKEc-3zxkQM-hmfcy0'
  },
  {
    title: 'Orange in Orange',
    image:
      'https://i.picsum.photos/id/1016/3844/2563.jpg?hmac=WEryKFRvTdeae2aUrY-DHscSmZuyYI9jd_-p94stBvc'
  }
];

const IMAGE_SMALL = 48;
const IMAGE_BIG_HEIGHT = 303;
const IMAGE_BIG_WIDTH = 180;

const TextLeft = ({active = false, title}) => {
  return (
    <View
      style={{
        marginBottom: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}>
      <View style={styles.rotateText}>
        <View
          style={[
            styles.activeDot,
            {
              opacity: active ? 1 : 0
            }
          ]}
        />
        <Text style={[styles.titleNavbar]}>{title}</Text>
      </View>
    </View>
  );
};
const NavbarLeft = () => {
  return (
    <View style={[styles.column, styles.navbarLeft]}>
      <View style={[styles.column, styles.flex]}>
        <TextLeft title="Rain" />
        <TextLeft title="Mountain" active />
        <TextLeft title="Natural" />
        <TextLeft title="FLOW" />
        <TextLeft title="OUTHER" />
      </View>
      <Image
        style={[styles.profile]}
        source={{
          uri: 'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y'
        }}
      />
    </View>
  );
};
const NatureListItem = ({data, active, index, y}) => {
  const yStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}]
    };
  });
  const sizeStyle = useAnimatedStyle(() => {
    let inputRange = [
      -IMAGE_BIG_HEIGHT * (index - 1) - IMAGE_BIG_HEIGHT,
      -IMAGE_BIG_HEIGHT * index,
      -IMAGE_BIG_HEIGHT * index + IMAGE_BIG_HEIGHT / 2
    ];
    const width = interpolate(
      y.value,
      inputRange,
      [IMAGE_BIG_WIDTH, IMAGE_BIG_WIDTH, IMAGE_SMALL],
      Extrapolate.CLAMP
    );
    const height = interpolate(
      y.value,
      inputRange,
      [IMAGE_BIG_HEIGHT, IMAGE_BIG_HEIGHT, IMAGE_SMALL],
      Extrapolate.CLAMP
    );
    return {
      width,
      height
    };
  });
  const textStyle = useAnimatedStyle(() => {
    let inputRange = [
      -IMAGE_BIG_HEIGHT * (index - 1) - IMAGE_BIG_HEIGHT,
      -IMAGE_BIG_HEIGHT * index,
      -IMAGE_BIG_HEIGHT * index + IMAGE_BIG_HEIGHT / 2
    ];
    const opacity = interpolate(
      y.value,
      inputRange,
      [0, 0, 1],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      y.value,
      inputRange,
      [20, 20, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [
        {
          translateX
        }
      ]
    };
  });
  const textInnerStyle = useAnimatedStyle(() => {
    let inputRange = [
      -IMAGE_BIG_HEIGHT * (index - 1) - IMAGE_BIG_HEIGHT,
      -IMAGE_BIG_HEIGHT * index,
      -IMAGE_BIG_HEIGHT * index + IMAGE_BIG_HEIGHT / 2
    ];
    const opacity = interpolate(
      y.value,
      inputRange,
      [1, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity
    };
  });

  return (
    <Animated.View
      style={[
        {
          marginBottom: 30,
          flexDirection: 'row'
        },
        yStyle
      ]}>
      <Animated.View
        style={[
          {
            marginRight: 10,
            width: 180,
            height: 303,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#ffffff',
            borderRadius: 10
          },
          sizeStyle
        ]}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
            resizeMode: 'cover'
          }}
          source={{uri: data.image}}
        />
        <Animated.Text
          style={[
            {
              fontFamily: 'Montserrat-Bold',
              fontSize: 40,
              paddingTop: 10,
              color: '#fff',
              position: 'absolute',
              bottom: 0,
              left: 0,
              padding: 20
            },
            textInnerStyle
          ]}>
          {index + 1}
          {'\n'}

          <Text
            style={[
              {
                fontFamily: 'Montserrat-Medium',
                fontSize: 12,
                paddingTop: 10,
                color: '#d9d9d9',
                position: 'absolute',
                bottom: 0,
                left: 0
              }
            ]}>
            {'\n'}

            {data.title}
          </Text>
        </Animated.Text>
      </Animated.View>
      <Animated.Text
        style={[
          {
            fontFamily: 'Montserrat-Bold',
            fontSize: 12,
            paddingTop: 10
          },
          textStyle
        ]}>
        {data.title}
      </Animated.Text>
    </Animated.View>
  );
};
const Content = () => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(0);
  const handleFling = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      let goTo = active.value;
      if (active.value < data.length - 1) {
        goTo = goTo + 1;
        if (active.value != goTo) {
          handleGoTo(goTo);
        }
      }
    }
  };
  const handleFlingTop = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      let goTo = active.value;
      if (active.value >= 1) {
        goTo = goTo - 1;
        if (active.value != goTo) {
          handleGoTo(goTo);
        }
      }
    }
  };
  const handleGoTo = goTo => {
    const snapPoints = data.map((_, i) =>
      i == 0
        ? 0
        : -i * ((i <= active.value + 1 ? IMAGE_BIG_HEIGHT : IMAGE_SMALL) + 30)
    );
    active.value = goTo;
    translateY.value = withSpring(snapPoints[goTo], {
      mass: 2,
      velocity: 2,
      damping: 120
    });
  };
  const snapPointsText = data.map((_, i) => (i == 0 ? 0 : -i * 30));

  const titleStyle = useAnimatedStyle(() => {
    const snapPoints = data.map((_, i) =>
      i == 0 ? 0 : -i * (IMAGE_BIG_HEIGHT + 30)
    );

    const y = interpolate(translateY.value, snapPoints, snapPointsText);
    return {
      transform: [{translateY: y}]
    };
  });
  return (
    <View style={[styles.flex, {padding: 20}]}>
      <Text style={[styles.titleNatureLP]}>Nature LP</Text>
      <View
        style={{
          overflow: 'hidden',
          height: 30,
          marginBottom: 35
        }}>
        <Animated.View style={[titleStyle]}>
          {data.map((e, k) => {
            return (
              <Text style={[styles.titleNature]} key={k}>
                {e.title}
              </Text>
            );
          })}
        </Animated.View>
      </View>
      <FlingGestureHandler
        numberOfPointers={1}
        direction={Directions.UP}
        onHandlerStateChange={handleFlingTop}>
        <FlingGestureHandler
          numberOfPointers={1}
          direction={Directions.DOWN}
          onHandlerStateChange={handleFling}>
          <View style={{overflow: 'hidden'}}>
            {/* <PanGestureHandler onGestureEvent={onGestureEvent}> */}

            <Animated.View>
              {data.map((e, k) => {
                return (
                  <NatureListItem
                    data={e}
                    y={translateY}
                    active={active}
                    index={k}
                    key={k}
                  />
                );
              })}
            </Animated.View>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </View>
  );
};

//inpiring by https://dribbble.com/shots/6777251-Personal-exercises-01
const Naturelp = (props: Props) => {
  return (
    <View style={[styles.row, styles.flex]}>
      <NavbarLeft />
      <Content />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  rowC: {
    alignContent: 'center'
  },
  colC: {
    justifyContent: 'center'
  },
  flex: {
    flex: 1
  },
  navbarLeft: {
    width: 80,
    borderRightColor: '#d9d9d9',
    borderRightWidth: 1,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center'
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 100,
    resizeMode: 'cover'
  },
  titleNavbar: {
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center'
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: '#F9A177',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#ffb897'
  },
  rotateText: {
    transform: [{rotate: '-90deg'}],
    marginBottom: 30,
    width: 100,
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleNatureLP: {
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 50
  },
  titleNature: {
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    letterSpacing: 1,
    color: '#656565',
    height: 30
  }
});

export default Naturelp;
