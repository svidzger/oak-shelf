import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    navigation.navigate('SignUp');
  };
  const auth = getAuth();
  const userLogin = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          console.log('User logged-in successfully!');
          setEmail('');
          setPassword('');
          navigation.navigate('User');
        })
        .catch((error) => console.error(err));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Sign in</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        <Button mode="contained" onPress={userLogin}>
          Sign in
        </Button>
        {/* add forgot password oprion */}
      </SafeAreaView>
      <Text style={{ paddingTop: 10 }}>Don't have an account?</Text>
      <Button onPress={onRegisterPressed}>Register</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignInScreen;
