import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { database } from '../firebase/firebase';
import { ref, set } from 'firebase/database';
import books2 from '../assets/books2.png';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();

  // Function to register new user with Firebase Authentication
  const registerUser = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          updateProfile(auth.currentUser, {
            displayName: username,
          }).then(() => {
            // Creates a collection for each user on user creation
            set(ref(database, 'users/' + auth.currentUser.uid + '/profile'), {
              username: auth.currentUser.displayName,
              email: auth.currentUser.email,
            });
          });
          console.log('User registered successfully!');
          setUsername('');
          setEmail('');
          setPassword('');
          navigation.navigate('SignIn');
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 26 }}>Personal Bookshelf</Text>
      <Image style={{ width: 200, height: 200 }} source={books2} />
      <Text style={{ fontSize: 18 }}>Create an account</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter username"
        />
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
        <Button
          style={{ marginBottom: 10, marginTop: 20 }}
          mode="contained"
          onPress={registerUser}
        >
          Register
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Back
        </Button>
      </SafeAreaView>
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

export default SignUpScreen;
