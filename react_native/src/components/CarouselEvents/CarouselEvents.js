import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useTheme} from '../../context/TestContext';
import {COLORS, SIZES} from '../../utils/utils/constants';
import EventItem from '../EventItem/EventItem';

const FlatListAnimated = Animated.createAnimatedComponent(FlatList);
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  paginationCtn: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    height: 3,

    marginTop: SIZES.size_16,
  },
  paginationDot: {
    width: 30,
    height: 3,
    borderRadius: 3,
    backgroundColor: COLORS.light_gray,
  },
  paginationDotContainer: {},
  paginationIndicator: {
    width: 30,
    height: 3,
    borderRadius: 3,

    backgroundColor: '#000',
  },
});
const data = [
  {
    title: 2,
    image: 'https://picsum.photos/600/600',
  },
  {
    title: 3,
    image: 'https://picsum.photos/600/600',
  },
  {
    title: 3,
    image: 'https://picsum.photos/600/600',
  },
  {
    title: 3,
    image: 'https://picsum.photos/600/600',
  },
];

export default function CarouselEvents() {
  const [theme] = useTheme();
  console.log(theme);
  const x = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    x.value = event.contentOffset.x;
  });
  const inputRange = [-width, 0];

  const translateXStyle = useAnimatedStyle(() => {
    const xx = interpolate(x.value, inputRange, [-30, 0]);
    return {
      transform: [
        {
          translateX: xx,
        },
      ],
    };
  });
  return (
    <View>
      <FlatListAnimated
        data={data}
        keyExtractor={item => item.title}
        removeClippedSubviews={false}
        horizontal
        style={{
          flexGrow: 0,
        }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderToHardwareTextureAndroid
        scrollEventThrottle={16}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={width}
        pagingEnabled
        onScroll={scrollHandler}
        renderItem={({item, index}) => {
          return <EventItem data={item} scrollX={x} animate index={index} />;
        }}
      />

      <View style={[styles.paginationCtn]}>
        <View style={[styles.pagination]}>
          {data.map((item, k) => {
            return (
              <View key={item.key} style={styles.paginationDotContainer}>
                <View
                  style={[
                    styles.paginationDot,
                    {
                      borderTopLeftRadius: k == 0 ? 10 : 0,
                      borderTopRightRadius: k == data?.length - 1 ? 10 : 0,
                      borderBottomLeftRadius: k == 0 ? 10 : 0,
                      borderBottomRightRadius: k == data?.length - 1 ? 10 : 0,
                      overflow: 'hidden',
                    },
                  ]}></View>
              </View>
            );
          })}
          <Animated.View
            style={[
              styles.paginationIndicator,
              {
                position: 'absolute',
                lef: 0,
                top: 0,
                // backgroundColor: 'red',
              },
              translateXStyle,
            ]}></Animated.View>
        </View>
      </View>
    </View>
  );
}
