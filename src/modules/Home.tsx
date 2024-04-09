import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';
import Card from './Card';

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>账户管理</Text>
      </View>
      <Switch
        style={styles.switch}
        value={isOpen}
        onValueChange={value => setIsOpen(value)}
      />
      <Card showPassword={isOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    height: 46,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  switch: {
    position: 'absolute',
    right: 12,
  },
});
