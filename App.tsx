import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Home from './src/modules/Home';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
});

export default App;
