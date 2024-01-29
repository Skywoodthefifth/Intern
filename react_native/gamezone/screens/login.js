import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";

import * as SecureStore from "expo-secure-store";

const reviewSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

import { baseURL } from "../shared/Apiconfig";

export default function Login({ navigation }) {
  const login = (values) => {
    try {
      const formData = new FormData();
      formData.append("grant_type", "password");
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("client_id", "HMux6bspQ2dkMYYLWW6g1kFD0plU4ohECTGoqwxZ");
      formData.append(
        "client_secret",
        "mBvCygrNi8vohgEl7U0f2gF8STsLuFEHQsKgC999UtOi4R7IS2UgeRJpmYgCYbD5jd8X2FIo9Q6r25px9f4szPz2ZZE4hQk1iHxnwiIEmJ5sP2apAz32wPRNiJvp39ae"
      );

      fetch(`${baseURL}/o/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          SecureStore.setItem("token", JSON.stringify(data));
          navigation.navigate("HomeNavigator");
        });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <View
      style={{
        ...globalStyles.container,
        justifyContent: "center",
        alignContent: "center",
      }}
      //onPress={Keyboard.dismiss}
    >
      <Image
        source={require("../assets/heart_logo.png")}
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          height: 60,
          width: 60,
          marginBottom: 30,
        }}
      />
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          login(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Username"
              onChangeText={props.handleChange("username")}
              value={props.values.username}
              onBlur={props.handleBlur("username")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.username && props.errors.username}
            </Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>

            <FlatButton text="Login" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
