import {useFocusEffect, useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {Dimensions, Text, useWindowDimensions, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {TabBar, TabView} from 'react-native-tab-view';
import ROCK from '../../assets/rock.png';
import USER from '../../assets/user.png';
import EventCalendar, {
  SIZEEVENTHEIGHT,
} from '../../components/EventCalendar/EventCalendar';
import {FONT_FAMILY_BOLD, SIZES} from '../../utils/utils/constants';
import {DEFAULTSTYLES} from '../../utils/utils/styles';
import Calendar from '../Calendar/Calendar';
const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
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
const EventListTab = ({event, eventFilter}) => {
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={SIZEEVENTHEIGHT}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        pagingEnabled>
        <View style={DEFAULTSTYLES.containerPadding}>
          {event && (
            <EventCalendar
              key={event.key}
              data={event}
              translationY={translationY}
              index={0}
              fadeUp={false}
              size={eventFilter.length + 1}
              style={{
                marginBottom: SIZES.size_20,
              }}
              navigate={() => {
                navigation.navigate('EventDetails', {item: event});
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
                navigate={() => {
                  navigation.navigate('EventDetails', {item: e});
                }}
              />
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const CalendarTab = () => (
  <View style={{flex: 1}}>
    <Calendar />
  </View>
);

const EventsCalendar = ({route: {params}}) => {
  const [event, setEvent] = useState(eventsData[0]);
  const [eventFilter, setEventFilter] = useState(eventsData.slice(1));
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState([
    {key: 'EVENT', title: 'Ingressos'},
    {key: 'CALENDAR', title: 'Conveniência'},
  ]);
  const renderScene = ({route: r, jumpTo}) => {
    switch (r.key) {
      case 'EVENT':
        return <EventListTab event={event} eventFilter={eventFilter} />;
      case 'CALENDAR':
        return <CalendarTab />;
    }
  };
  // const item = params?.item;
  const [item, setItem] = useState(null);
  const onClickEvent = item => {
    setOpen(false);
    setItem(item);
    let events = [...eventsData].filter(e => {
      return item ? e.pos >= item.pos : e;
    });
    setEvent(events[0]);
    events.shift();
    setEventFilter(events);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  return (
    <View style={DEFAULTSTYLES.container}>
      <View
        style={[
          {
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: SIZES.size_18,
            paddingVertical: SIZES.size_10,
          },
        ]}>
        <Text
          style={[
            {
              fontFamily: FONT_FAMILY_BOLD,
              fontSize: SIZES.size_20,
              color: '#000',
            },
          ]}
          onPress={() => {
            setOpen(true);
            // navigation.navigate('Calendar');
          }}>
          Events
        </Text>
        <Animated.Image
          source={USER}
          style={[
            {
              width: SIZES.size_25,
              height: SIZES.size_25,
            },
          ]}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <TabView
          onIndexChange={ind => {
            setIndex(ind);
          }}
          swipeEnabled={true}
          navigationState={{index, routes}}
          renderScene={renderScene}
          initialLayout={initialLayout}
          timingConfig={400}
          renderTabBar={props => {
            return (
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: '#23A0E9',
                  height: 3,
                  borderRadius: 2,
                  bottom: -2,
                }}
                style={{
                  backgroundColor: '#F8F8F8',
                  shadowOpacity: 0,
                  borderBottomWidth: 2,
                  borderColor: '#EBEBED',
                }}
                renderLabel={({route, focused, color}) => (
                  <Text style={{color: focused ? '#23A0E9' : '#CCCCCC'}}>
                    {route.title}
                  </Text>
                )}
              />
            );
            // return <TabInfo {...props} index={index} setIndex={setIndex} />;
          }}
        />
      </View>
    </View>
  );
};

export default EventsCalendar;
