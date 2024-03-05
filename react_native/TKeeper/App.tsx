import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import CalendarModule from './src/CalendarModule';
import ImagePickerModule from './src/ImagePickerModule';

function App() {
  const [ImageUri, setImageUri] = useState(null);

  async function onSubmit() {
    try {
      const eventId = await CalendarModule.createCalendarEvent(
        'Party',
        'My House',
      );
      console.log(`Created a new event with id ${eventId}`);
    } catch (e) {
      console.error(e);
    }

    try {
      const uri = await ImagePickerModule.pickImage();
      console.log(`Image Data: ${uri}`);
      setImageUri(uri);
    } catch (error) {
      console.error(error);
    }
  }

  async function onPressHandler() {
    await onSubmit();
    const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
    console.log(DEFAULT_EVENT_NAME);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native!</Text>
      <Button title="Press Me" onPress={onPressHandler} />
      {ImageUri && (
        <Image
          source={{
            uri: ImageUri,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default App;
