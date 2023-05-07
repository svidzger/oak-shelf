import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import books2 from '../assets/books2.png';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();

  const onRegisterPressed = () => {
    navigation.navigate('SignUp');
  };

  // Function to log in existing Firebase user
  const userLogin = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log('User logged-in successfully!');
          setEmail('');
          setPassword('');
          navigation.navigate('User');
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>Personal Bookshelf</Text>
      <Image style={{ width: 200, height: 200 }} source={books2} />
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
        <Button style={{ marginTop: 20 }} mode="contained" onPress={userLogin}>
          Sign in
        </Button>
      </SafeAreaView>
      <Text style={{ paddingTop: 10 }}>Don't have an account?</Text>
      <Button onPress={onRegisterPressed}>Register</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 30,
    margin: 12,
    padding: 10,
  },
});

export default SignInScreen;
