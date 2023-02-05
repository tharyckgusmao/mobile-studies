import {useNavigation} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';
import React, {useMemo, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {
  FONT_FAMILY_BOLD,
  height,
  SIZES,
  width,
} from '../../utils/utils/constants';
import {DEFAULTSTYLES} from '../../utils/utils/styles';
import {eventsData} from '../EventsCalendar/EventsCalendar';

dayjs.locale('pt-br');
dayjs.extend(isBetween);

function CalendarMonth({date, style, events, navigate, onClickEvent}) {
  const [currentDate, setCurrentDate] = useState([dayjs(date)]);
  const days = pos => {
    const dateFormat = 'ddd';
    const days = [];
    const startDate = dayjs(currentDate[pos]).startOf('week');
    for (let i = 0; i < 7; i++) {
      days.push(
        <Text
          key={i}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#85868A',
            paddingBottom: SIZES.size_4,
          }}>
          {dayjs(startDate).add(i, 'day').format(dateFormat)}
        </Text>,
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#CCCCCC',
          borderBottomWidth: 1,
        }}>
        {days}
      </View>
    );
  };
  const header = pos => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SIZES.size_18,
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY_BOLD,
            color: '#000',
            fontSize: SIZES.size_14,
            textTransform: 'capitalize',
          }}>
          {currentDate[pos].format('MMMM YYYY')}
        </Text>
      </View>
    );
  };

  const cells = pos => {
    const monthStart = dayjs(currentDate[pos]).startOf('month');
    const monthEnd = dayjs(monthStart).endOf('month');
    const startDate = dayjs(monthStart).startOf('week');
    const endDate = dayjs(monthEnd).endOf('week');
    const dayNow = new Date().setHours(-1, 0, 0);
    const dateFormat = 'DD';
    const rows = [];
    let days = [];

    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dayjs(day).format(dateFormat);
        const cloneDay = day;

        let otherMonth = false;
        let beforeDay = false;
        let containsEvent = false;

        if (!cloneDay.isSame(monthStart, 'month')) {
          otherMonth = true;
        }
        if (day.isBefore(dayjs())) {
          beforeDay = true;
        }

        containsEvent = events.find(e => {
          return e.formatedDateDay == formattedDate;
        });
        days.push(
          <TouchableOpacity
            disabled={!containsEvent}
            activeOpacity={0.6}
            onPress={() =>
              navigate('EventDetails', {
                item: containsEvent,
              })
            }
            key={day}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: SIZES.size_30,
            }}>
            {containsEvent && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SharedElement id={`item.${containsEvent.key}.photo`}>
                  <Image
                    source={containsEvent.image}
                    resizeMode="cover"
                    style={{
                      width: SIZES.size_30,
                      height: SIZES.size_30,
                      borderRadius: SIZES.size_8,
                    }}
                  />
                </SharedElement>
              </View>
            )}
            <Text
              style={{
                fontFamily: FONT_FAMILY_BOLD,
                color: beforeDay ? '#CCCCCC' : containsEvent ? '#fff' : '#000',
              }}>
              {otherMonth ? null : formattedDate}
            </Text>
          </TouchableOpacity>,
        );
        day = dayjs(day).add(1, 'day');
      }
      rows.push(
        <View
          key={day}
          style={{
            flexDirection: 'row',
          }}>
          {days}
        </View>,
      );
      days = [];
    }
    return <View>{rows}</View>;
  };
  return (
    <View style={style}>
      {header(0)}
      {days(0)}
      {cells(0)}
    </View>
  );
}

function Calendar({onClickEvent}) {
  const navigation = useNavigation();
  const CalendarDates = useMemo(() => {
    return new Array(2).fill(0).map((e, k) => {
      let date = dayjs().add(k, 'month');
      let evOfMonth = eventsData.filter(e => {
        return dayjs(e.date).isBetween(
          date.clone().startOf('month'),
          date.clone().endOf('month'),
        );
      });
      return (
        <CalendarMonth
          key={k}
          date={date}
          style={{
            marginBottom: SIZES.size_40,
          }}
          events={evOfMonth}
          // onClickEvent={onClickEvent}
          navigate={navigation.navigate}
        />
      );
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.View
        style={{
          flex: 1,
          width: width,
          // transform: [
          //   {
          //     translateY: current.progress.interpolate({
          //       inputRange: [0, 1],
          //       outputRange: [-height, 0],
          //       extrapolate: 'clamp',
          //     }),
          //   },
          // ],
        }}>
        <View style={[DEFAULTSTYLES.container]}>
          {/* <View
            style={[
              {
                // flex: 1,
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
                ,
              ]}
              onPress={() => {
                navigation.navigate('EventsCalendar');
              }}>
              CALENDAR EVENTS
            </Text>
          </View> */}
          <ScrollView
            scrollEventThrottle={16}
            snapToAlignment="start"
            showsVerticalScrollIndicator={false}>
            <View style={DEFAULTSTYLES.containerPadding}>{CalendarDates}</View>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

export default Calendar;
