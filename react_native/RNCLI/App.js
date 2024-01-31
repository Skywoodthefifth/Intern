import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const App = () => {
  const [cameraPosition, setCameraPosition] = useState('front');
  // const [cameraState, setCameraState] = useState()
  const [cameraPermission, setCameraPermission] = useState('not-determined');
  const device = useCameraDevice(cameraPosition);
  const toggleCamera = () => {
    setCameraPosition(cameraPosition === 'front' ? 'back' : 'front');
    console.log(cameraPosition);
  };
  const onCameraInitialized = () => {
    console.log('Camera initialized');
  };
  const onCamerError = error => {
    console.log(error);
  };
  useEffect(() => {
    checkPermission();
  }, []);
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    setCameraPermission(newCameraPermission);
    // const newMicrophonePermission = await Camera.requestMicrophonePermission()
    // const { hasPermission, requestPermission } = useMicrophonePermission()
  };
  if (!device) return <ActivityIndicator />;
  return (
    <View style={{flex: 1}}>
      {cameraPermission === 'granted' ? (
        <>
          {device && device !== undefined && (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              onInitialized={onCameraInitialized}
              onError={onCamerError}
            />
          )}
          <SafeAreaView>
            <Button
              title={
                cameraPosition === 'front'
                  ? 'Switch to back'
                  : 'Switch to front'
              }
              onPress={toggleCamera}
            />
          </SafeAreaView>
        </>
      ) : (
        <Text>The app need to be grand access to camera to work properly.</Text>
      )}
    </View>
  );
};

export default App;
