import React from 'react';
import { StyleSheet,View } from 'react-native';

import Navigator from './routes/drawer';
import { createStackNavigator } from 'react-navigation-stack';

export default function App() {
  return (
      <Navigator />
    
  );
}


