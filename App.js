import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './assets/navigation/Navigation'
import {store} from './assets/redux/Store'
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}