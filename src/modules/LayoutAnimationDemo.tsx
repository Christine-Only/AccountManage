import {useState} from 'react';
import {LayoutAnimation, View, TouchableOpacity, Text} from 'react-native';

const MyApp = () => {
  const [size, setSize] = useState(100);

  const toggleSize = () => {
    LayoutAnimation.easeInEaseOut(); //要在状态改变之前调用
    // setSize(prevSize => (prevSize === 100 ? 200 : 100));
    setSize(size === 100 ? 200 : 100);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: 'tomato',
        }}
      />
      <TouchableOpacity onPress={toggleSize}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>Toggle Size</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyApp;
