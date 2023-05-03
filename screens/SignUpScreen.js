import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const auth = getAuth();
  const registerUser = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: username,
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
        <Button mode="contained" onPress={registerUser}>
          Register
        </Button>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('SingIn')}
        >
          Already Registered? Click here to login
        </Text>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Back
        </Button>
      </SafeAreaView>
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

export default SignUpScreen;
