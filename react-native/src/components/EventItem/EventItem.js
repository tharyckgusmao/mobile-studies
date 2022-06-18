import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const EventItem = ({
  data,
  organize = false,
  scrollX = null,
  animate = false,
  index = 0,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    let x = 0;

    if (animate) {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];

      x = interpolate(scrollX.value, inputRange, [
        -width * 0.7,
        0,
        width * 0.7,
      ]);
      return {
        transform: [
          {
            translateX: x,
          },
        ],
      };
    }
    return {};
  });

  return (
    <>
      <TouchableOpacity activeOpacity={0.9} onPress={() => {}}>
        <View
          style={{
            width,
            height: height * 0.3,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            overflow: 'hidden',
          }}>
          <Animated.View
            style={[
              {
                width: width * 1.3,
                height: height * 0.3,
                position: 'absolute',
                left: 0,
                top: 0,
                backgroundColor: 'red',
              },
              animatedStyle,
            ]}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default EventItem;
