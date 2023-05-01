import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const navigation = useNavigation();

  const onRegisterPress = () => {
    // Snackbar showwing success on register
    navigation.navigate('SignIn');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Create an account</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder='Enter username'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder='Enter password'
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPasswordRepeat}
          value={passwordRepeat}
          placeholder='Repeat password'
          secureTextEntry={true}
        />
        <Button mode='contained' onPress={onRegisterPress}>
          Register
        </Button>
        <Button mode='outlined' onPress={() => navigation.goBack()}>
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
