/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from './src/context/TestContext';
import {Routes} from './src/routes';
import {DEFAULTSTYLES} from './src/utils/utils/styles';

const App = () => {
  return (
    <GestureHandlerRootView style={DEFAULTSTYLES.container}>
      <ThemeProvider defaultTheme="teste">
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create();

export default App;
