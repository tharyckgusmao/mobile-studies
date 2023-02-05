import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import * as React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import EventDetails from './pages/EventsCalendar/EventDetails';
import EventsCalendarTest from './pages/EventsCalendar/EventsCalendarTest';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator();
// import {enableScreens} from 'react-native-screens';
import {Platform} from 'react-native';
import Home from './pages/Home/Home';
import RopeSnap from './pages/RopeSnap/RopeSnap';
import Roullete from './pages/Roullete/Roullete';
import Mesh from './pages/Mesh/Mesh';
import Naturelp from './pages/Naturelp/Naturelp';
import CarouselParallax from './pages/CarouselParallax/CarouselParallax';
import Rotate360 from './pages/Rotate360/Rotate360';
import BookGallery from './pages/BookGallery/BookGallery';
import MemoryGame from './pages/MemoryGame/MemoryGame';
import Visx from './pages/Visx/Visx';

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
          // options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="RopeSnap"
          component={RopeSnap}
          // options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="Mesh"
          component={Mesh}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="MemoryGame"
          component={MemoryGame}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="BookGallery"
          component={BookGallery}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="Rotate360"
          component={Rotate360}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="CarouselParallax"
          component={CarouselParallax}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <Stack.Screen
          name="Naturelp"
          component={Naturelp}
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
        <Stack.Screen name="Visx" component={Visx} />
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
