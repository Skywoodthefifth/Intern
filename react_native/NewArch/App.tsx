/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {useState} from 'react';
import {Text, Button, Image, StyleSheet, View} from 'react-native';
// import RTNCalculator from 'rtn-calculator/js/NativeCalculator';
// import RTNImagePicker from 'rtn-image-picker/js/NativeImagePicker';
import MyLibraryTruong from 'react-native-my-library-truong';
import {MyComponentView} from 'react-native-my-component';

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
  // const [result, setResult] = useState<number | null>(null);
  // const [result_2, setResult_2] = useState<number | null>(null);
  const [result_3, setResult_3] = useState<number | null>(null);
  const [ImageUri, setImageUri] = useState<string | null>(null);

  async function onSubmit() {
    try {
      // const uri = await RTNImagePicker?.pickImage();

      const uri = await MyLibraryTruong?.pickImage();

      if (uri) {
        console.log(`Image Data: ${uri}`);
        setImageUri(uri);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onPressHandler() {
    // const value = await RTNCalculator?.add(3, 7);
    // setResult(value ?? null);
    // const value_2 = await RTNCalculator?.multiply(5, 121);
    // setResult_2(value_2 ?? null);
    const value_3 = await MyLibraryTruong?.multiply(161, 121);
    setResult_3(value_3 ?? null);
    await onSubmit();
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>3+7={result ?? '??'}</Text>
      <Text style={styles.text}>5*121={result_2 ?? '??'}</Text> */}
      <MyComponentView
        text="Hello World! From Fabric"
        style={{width: '100%', height: 30}}
      />
      <Text style={styles.text}>My library: 161*121={result_3 ?? '??'}</Text>
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
