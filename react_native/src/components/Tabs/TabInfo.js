import React, {memo, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Animated, {
  call,
  Extrapolate,
  interpolateNode,
} from 'react-native-reanimated';
import {SIZES, width} from '../../utils/utils/constants';
import TabItem from './TabItem';

const TabInfo = ({
  navigationState,
  position,
  setIndex,
  index,
  jumpTo,
  emptyTickets = false,
}) => {
  const ref = useRef(null);
  const inputRange = [0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2];

  const scale = position.interpolate({
    inputRange,
    outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
  });

  const opacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map(x => {
      const d = x - Math.trunc(x);
      return d === 0.49 || d === 0.51 ? 0 : 1;
    }),
  });

  const translateX = position.interpolate({
    inputRange: inputRange,
    outputRange: inputRange.map(x => {
      const i = Math.round(x);
      return i * 1 * 1;
    }),
  });

  return (
    <View
      style={{
        marginBottom: SIZES.size_10,
        marginTop: SIZES.size_10,
      }}>
      <ScrollView
        ref={ref}
        horizontal
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}>
        {navigationState.routes
          .filter(e => e.key)
          .map((tab, k) => {
            return (
              <TabItem
                k={k}
                position={position}
                style={{
                  flex: 1,
                  width: width / navigationState.routes.length,
                }}
                active={k == index}
                onPress={() => {
                  if (!emptyTickets) {
                    jumpTo(tab.key);
                  }
                }}
                inputRange={inputRange}
                {...tab}
                name={tab.title}
              />
            );
          })}
      </ScrollView>
      <Animated.View
        style={[
          styles.container,
          {
            width: `${100 / navigationState.routes.length}%`,
            transform: [{translateX}],
          },
        ]}>
        <Animated.View
          style={[styles.indicator, {opacity, transform: [{scale}]}]}
        />
      </Animated.View>
    </View>
  );
};
export default memo(TabInfo);

const styles = StyleSheet.create({});
