/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {useState} from 'react';
import {Text, Button, Image, StyleSheet, View} from 'react-native';
import RTNCalculator from 'rtn-calculator/js/NativeCalculator';
import RTNImagePicker from 'rtn-image-picker/js/NativeImagePicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
    marginTop: 20,
  },
});

const App: () => JSX.Element = () => {
  const [result, setResult] = useState<number | null>(null);
  const [ImageUri, setImageUri] = useState<string | null>(null);

  async function onSubmit() {
    try {
      const uri = await RTNImagePicker?.pickImage();

      if (uri) {
        console.log(`Image Data: ${uri}`);
        setImageUri(uri);
        console.log(`ImageUri: ${ImageUri}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onPressHandler() {
    const value = await RTNCalculator?.add(3, 7);
    setResult(value ?? null);
    await onSubmit();
  }

  return (
    // <View style={{flex: 1, alignSelf: 'center'}}>
    //   <Text style={{alignSelf: 'center', color: 'white'}}>
    //     3+7={result ?? '??'}
    //   </Text>
    //   <Button
    //     title="Press me"
    //     onPress={async () => {
    //       const value = await RTNCalculator?.add(3, 7);
    //       setResult(value ?? null);
    //       await onSubmit();
    //     }}
    //   />

    //   {ImageUri && (
    //     <Image
    //       source={{
    //         uri: ImageUri,
    //       }}
    //     />
    //   )}
    // </View>

    <View style={styles.container}>
      <Text style={styles.text}>3+7={result ?? '??'}</Text>
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
};

export default App;
