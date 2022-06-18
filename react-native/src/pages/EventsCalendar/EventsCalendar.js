import {useFocusEffect, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import ROCK from '../../assets/rock.png';
import USER from '../../assets/user.png';
import EventCalendar, {
  SIZEEVENTHEIGHT,
} from '../../components/EventCalendar/EventCalendar';
import {FONT_FAMILY_BOLD, SIZES} from '../../utils/utils/constants';
import {DEFAULTSTYLES} from '../../utils/utils/styles';

export const eventsData = [
  {
    key: Math.random().toString(16).slice(2),
    name: 'Mumford & Sons',
    image: ROCK,
    genre: 'Folk Rock',
    date: dayjs().add(2, 'day').format(),
    formatedDateDay: dayjs().add(2, 'day').format('DD'),
    formatedDateMonth: dayjs().add(2, 'day').format('MMM'),
    pos: 0,
  },
  {
    key: Math.random().toString(16).slice(2),
    name: 'Mumford & Sons',
    image: ROCK,
    genre: 'Folk Rock',
    date: dayjs().add(6, 'day').format(),
    formatedDateDay: dayjs().add(6, 'day').format('DD'),
    formatedDateMonth: dayjs().add(6, 'day').format('MMM'),
    pos: 1,
  },
  {
    key: Math.random().toString(16).slice(2),
    name: 'Mumford & Sons',
    image: ROCK,
    genre: 'Folk Rock',
    date: dayjs().add(10, 'day').format(),
    formatedDateDay: dayjs().add(10, 'day').format('DD'),
    formatedDateMonth: dayjs().add(10, 'day').format('MMM'),
    pos: 2,
  },
  {
    key: Math.random().toString(16).slice(2),
    name: 'Mumford & Sons',
    image: ROCK,
    genre: 'Folk Rock',
    date: dayjs().add(16, 'day').format(),
    formatedDateDay: dayjs().add(16, 'day').format('DD'),
    formatedDateMonth: dayjs().add(16, 'day').format('MMM'),
    pos: 3,
  },
];

const EventsCalendar = ({route: {params}}) => {
  const [event, setEvent] = useState(null);
  const [eventFilter, setEventFilter] = useState([]);
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const animatedOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, 60],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });

  const animatedNavBarStyle = useAnimatedStyle(() => {
    const xx = interpolate(translationY.value, [0, 60], [0, -50]);

    return {
      transform: [
        {
          translateX: xx,
        },
      ],
    };
  });

  const animatedNavBarInverseStyle = useAnimatedStyle(() => {
    const xx = interpolate(translationY.value, [0, 60], [0, 50]);

    return {
      transform: [
        {
          translateX: xx,
        },
      ],
    };
  });

  const navigation = useNavigation();
  const item = params?.item;

  useFocusEffect(
    React.useCallback(() => {
      let events = [...eventsData].filter(e => {
        return item ? e.pos >= item.pos : e;
      });
      setEvent(events[0]);
      events.shift();
      setEventFilter(events);

      return () => {
        setEvent(null);
        setEventFilter([]);
      };
    }, [item]),
  );
  return (
    <View style={DEFAULTSTYLES.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={SIZEEVENTHEIGHT}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        pagingEnabled>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: SIZES.size_18,
              paddingVertical: SIZES.size_10,
            },
          ]}>
          <Animated.Text
            style={[
              {
                fontFamily: FONT_FAMILY_BOLD,
                fontSize: SIZES.size_20,
                color: '#000',
              },
              animatedNavBarStyle,
              animatedOpacityStyle,
            ]}
            onPress={() => {
              navigation.navigate('Calendar');
            }}>
            Events
          </Animated.Text>
          <Animated.Image
            source={USER}
            style={[
              {
                width: SIZES.size_25,
                height: SIZES.size_25,
              },

              animatedNavBarInverseStyle,
              animatedOpacityStyle,
            ]}
          />
        </View>
        <View style={DEFAULTSTYLES.containerPadding}>
          {event && (
            <EventCalendar
              key={event.key}
              data={event}
              shared={item?.key === event.key ? item : null}
              translationY={translationY}
              index={0}
              fadeUp={false}
              size={eventFilter.length + 1}
              style={{
                marginBottom: SIZES.size_20,
              }}
            />
          )}
          {eventFilter.map((e, k) => {
            return (
              <EventCalendar
                key={k}
                data={e}
                shared={null}
                translationY={translationY}
                index={k + 1}
                fadeUp={true}
                size={eventFilter.length + 1}
                style={{
                  marginBottom:
                    eventFilter.length - 1 == k
                      ? SIZES.size_220 * 1.5
                      : SIZES.size_20,
                }}
              />
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default EventsCalendar;
