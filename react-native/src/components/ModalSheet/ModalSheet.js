import {useFocusEffect} from '@react-navigation/native';
import React, {memo, useCallback, useEffect} from 'react';
import {
  BackHandler,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SIZES} from '../../utils/utils/constants';

const styles = StyleSheet.create({
  ctn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    zIndex: 2,
    flex: 1,
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    zIndex: 2,
  },
  contentBackground: {
    backgroundColor: '#00000030',
    opacity: 0,
    flex: 1,
    height: Dimensions.get('window').height,

    width: '100%',
  },
  dataCtn: {
    paddingTop: SIZES.size_14,
    paddingBottom: SIZES.size_20,

    height: '100%',
  },

  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: SIZES.size_5,
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc',
  },
  hackGlutter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    left: 0,
    backgroundColor: '#fff',
  },
});

const ModalSheet = ({
  open = 0,
  onClose,
  onConfirm,
  height,
  children,
  onOpenFinish,
  logo = true,
}) => {
  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       onClose();
  //       return true;
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );

  const y = useSharedValue(height);
  const opacity = useDerivedValue(() =>
    interpolate(y.value, [30, height * 0.5], [1, 0]),
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      const f = ctx.startY + event.translationY;
      y.value = f >= 0 ? f : 0;
    },
    onEnd: (event, ctx) => {
      const f = ctx.startY + event.translationY;
      y.value =
        f >= height * 0.3
          ? withTiming(height, {}, finished => {
              if (finished) {
                runOnJS(onClose)();
              }
            })
          : withSpring(30);
    },
  });

  useEffect(() => {
    if (open) {
      y.value = withSpring(
        30,
        {
          damping: 10,
          mass: 0.5,
        },
        finish => {
          if (finish) {
            runOnJS(onOpenFinish)();
          }
        },
      );
    } else {
      y.value = withTiming(height);
    }
  }, [open]);
  const opacityAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  });

  return (
    <View style={styles.ctn} pointerEvents={open ? 'auto' : 'none'}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          flex: 1,
          width: '100%',
          height: Dimensions.get('window').height,
        }}
        onPress={() => {
          onClose();
        }}>
        <Animated.View style={[styles.contentBackground, opacityAnimated]} />
      </TouchableOpacity>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.container,
            {
              height,
            },
            animatedStyle,
          ]}>
          <View style={styles.draggableContainer}>
            <View style={styles.draggableIcon} />
          </View>
          <View style={styles.dataCtn}>{children}</View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default memo(ModalSheet);
