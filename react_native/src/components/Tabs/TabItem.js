import React, {memo, useMemo} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONT_FAMILY_BOLD, SIZES} from '../../utils/utils/constants';

const TabItem = ({name, active, k, onPress, style, position, inputRange}) => {
  const inptRagesBg = useMemo(
    () => inputRange.map(inputIndex => (inputIndex === k ? 1 : 0)),
    [],
  );

  const opacity = position.interpolate({
    inputRange,
    outputRange: inptRagesBg,
  });

  return (
    <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
      <View
        style={[
          styles.container,
          {
            position: 'absolute',
            backgroundColor: 'transparent',
            left: 0,

            top: 0,
          },
        ]}>
        <Text style={[styles.text, {color: COLORS.light_gray}]}>{name}</Text>
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity,
            borderColor: COLORS.violet_blue,
          },
        ]}>
        <Text style={[styles.text, {color: '#fff'}]}>{name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(TabItem);

const styles = StyleSheet.create({
  container: {
    height: SIZES.size_20,
    marginRight: SIZES.size_10,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.size_10,
    width: '100%',
    backgroundColor: 'red',
    textAlign: 'center',
  },
  text: {
    fontSize: SIZES.size_12,
    fontFamily: FONT_FAMILY_BOLD,
    color: '#B4B4B6',
  },
});
