import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Button
          style={{ width: 300, marginTop: 40 }}
          mode='contained'
          onPress={() => navigation.navigate('Search')}
        >
          Search for books
        </Button>
      </View>
      <View style={{ flex: 5 }}>
        <Text>Want to read books</Text>
        <Text>Want to read books</Text>
        <Text>Want to read books</Text>
        <Text>Want to read books</Text>
        <Text>Want to read books</Text>
        <Text>Want to read books</Text>
        <Text>Want to read books</Text>
        <Text>Want to read books</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={{ width: 300, marginTop: 40 }}
          mode='contained'
          onPress={() => navigation.navigate('SignIn')}
        >
          Sign out
        </Button>
      </View>
    </View>
  );
}
