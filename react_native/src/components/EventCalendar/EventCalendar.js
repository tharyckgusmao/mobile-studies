import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {SharedElement} from 'react-navigation-shared-element';
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_MEDIUM,
  SIZES,
} from '../../utils/utils/constants';

export const SIZEEVENTHEIGHT = SIZES.size_220;
export default function EventCalendar({
  data,
  translationY,
  index,
  style,
  shared,
  navigate,
}) {
  const animatedBgStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index];

    let backgroundColor = interpolateColor(
      Math.round(translationY.value / (SIZEEVENTHEIGHT + SIZES.size_40) || 0),
      inputRange,
      ['#ffffff', '#23A0E9'],
    );
    let color = interpolateColor(
      Math.round(translationY.value / (SIZEEVENTHEIGHT + SIZES.size_40) || 0),
      inputRange,
      ['#85868A', '#ffffff'],
    );

    return {
      backgroundColor,
      color,
    };
  });
  return (
    <Animated.View
      entering={shared ? FadeIn : FadeInDown.duration(500).delay(500)}
      exiting={FadeOut}
      style={[styles.eventCtn, style]}>
      <View
        style={{
          marginRight: SIZES.size_24,
          zIndex: 2,
        }}>
        <Svg
          width={5}
          height={SIZEEVENTHEIGHT}
          fill="none"
          style={styles.dotted}
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d={`M2.5 2 3 ${SIZEEVENTHEIGHT}`}
            stroke="#EBEBED"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.1 16"
          />
        </Svg>
        <Animated.View
          style={[styles.dateCtn, styles.dateCalendarCtn, animatedBgStyle]}>
          <Animated.Text style={[styles.dayLabel, animatedBgStyle]}>
            {data.formatedDateDay}
          </Animated.Text>
          <Animated.Text style={[styles.monthLabel, animatedBgStyle]}>
            {data.formatedDateMonth}
          </Animated.Text>
        </Animated.View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigate();
        }}
        style={{
          height: SIZEEVENTHEIGHT,
          flex: 1,
        }}>
        {/* {shared ? ( */}
        <SharedElement id={`item.${data.key}.photo`} styles={styles.imageCtn}>
          <Image source={data.image} resizeMode="cover" style={styles.image} />
        </SharedElement>
        {/* ) : (
          <View styles={styles.imageCtn}>
            <Image
              source={data.image}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        )} */}
        <Animated.View
          style={styles.infoCtn}
          entering={FadeIn.duration(500).delay(500)}
          exiting={FadeOut}>
          <View style={styles.dateWrapper}>
            <View style={styles.dateCtn}>
              <Text style={styles.dayLabel}>{data.formatedDateDay}</Text>
              <Text style={styles.monthLabel}>{data.formatedDateMonth}</Text>
            </View>
          </View>
          <View style={styles.infoBottom}>
            <Text style={styles.nameLabel}>{data.name}</Text>
            <Text style={styles.genreLabel}>{data.genre}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dotted: {
    position: 'absolute',
    left: SIZES.size_18,
    top: SIZES.size_40,
    height: SIZEEVENTHEIGHT,
    width: 20,
    zIndex: 1,
  },
  eventCtn: {
    flexDirection: 'row',
    marginBottom: SIZES.size_20,
  },
  imageCtn: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.size_20,
  },
  imageGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
    borderRadius: SIZES.size_20,
  },
  infoCtn: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'column',
    zIndex: 3,
  },
  dateWrapper: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  dateCalendarCtn: {
    backgroundColor: '#fff',
    margin: 0,
  },
  dateCtn: {
    backgroundColor: '#ffffff90',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: SIZES.size_8,
    paddingBottom: SIZES.size_8,
    paddingLeft: SIZES.size_10,
    paddingRight: SIZES.size_10,
    borderRadius: SIZES.size_8,
    margin: SIZES.size_12,
    zIndex: 2,
  },
  dayLabel: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: SIZES.size_14,
    color: '#000',
    textAlign: 'center',
  },
  monthLabel: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: SIZES.size_10,
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',

    lineHeight: SIZES.size_10,
  },
  infoBottom: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    padding: SIZES.size_14,
  },
  nameLabel: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: SIZES.size_16,
    color: '#fff',
    textAlign: 'left',
  },
  genreLabel: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: SIZES.size_12,
    color: '#fff',
    textAlign: 'left',
  },
});
