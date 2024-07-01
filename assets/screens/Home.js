import { View,StyleSheet,} from 'react-native';
import React from 'react';
import Update from '../components/Update';
import { useDispatch } from 'react-redux';
import { setButtonText } from '../redux/sendData/updateButton';

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const handleButtonPress = buttonName => {
    dispatch(setButtonText(buttonName));
    navigation.navigate('Profile')
  };
 

  return (
    <View style={styles.container}>
      <Update name={'send'} title={'Send'} onPress={() => handleButtonPress('Send')} />
      <Update name={'add-circle'} title={'Receive'} onPress={() => handleButtonPress('Recieve')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
