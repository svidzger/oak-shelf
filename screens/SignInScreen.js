import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const onSignInPressed = () => {
    console.log('Sign in pressed');

    //validate in db
    navigation.navigate('User');
  };

  const onRegisterPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Sign in</Text>
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
        <Button mode='contained' onPress={onSignInPressed}>
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
