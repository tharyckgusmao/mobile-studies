import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import * as React from 'react';
import Calendar from './pages/Calendar/Calendar';
import EventDetails from './pages/EventsCalendar/EventDetails';
import EventsCalendarTest from './pages/EventsCalendar/EventsCalendarTest';
import {TransitionPresets} from '@react-navigation/stack';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator();
// import {enableScreens} from 'react-native-screens';
import {Platform} from 'react-native';
import Roullete from './pages/Roullete/Roullete';
import Home from './pages/Home/Home';

// enableScreens(true);
export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
        }}
        initialRouteName={'Home'}
        detachInactiveScreens={false}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="Roullete"
          component={Roullete}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="EventsCalendar"
          component={EventsCalendarTest}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          sharedElements={(route, otherRoute, showing) => {
            const {item} = route.params;
            if (otherRoute.name == 'EventsCalendar') {
              let config = {
                id: `item.${item?.key}.photo`,
                animation: 'move',
              };
              return Platform.select({
                ios: [config],
                android: showing ? [config] : [],
              });
            }
            //   }
          }}
          options={{
            headerShown: false,
            gesturesEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        {/* <Stack.Screen
          name="EventsCalendar"
          component={EventsCalendar}
          sharedElements={(route, otherRoute, showing) => {
            const {item} = route.params;
            if (otherRoute.name === 'Calendar' && showing) {
              return [
                {
                  id: `item.${item?.key}.photo`,
                  animation: 'move',
                  resize: 'none',
                },
              ];
            }
          }}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        {/* <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            contentStyle: {backgroundColor: '#ffffff00'},
          }}> */}
        {/* <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{
            headerShown: false,
          }}
        />{' '} */}
        {/* </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
