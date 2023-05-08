import React from 'react';
import { View, FlatList, Image, Alert } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../firebase/firebase';
import { remove, ref, onValue } from 'firebase/database';

export default function UserScreen() {
  const [books, setBooks] = React.useState([]);
  const [emptyBooks, setEmptyBooks] = React.useState('');

  const navigation = useNavigation();

  // Get all user books
  React.useEffect(() => {
    onValue(
      ref(database, 'users/' + auth.currentUser.uid + '/books'),
      (snapshot) => {
        const data = snapshot.val();
        if (data === null) {
          setEmptyBooks('You have no added books.');
        } else {
          setEmptyBooks('');
          const keys = Object.keys(data);
          const dataWithKeys = Object.values(data).map((obj, index) => {
            return { ...obj, key: keys[index] };
          });
          setBooks(dataWithKeys);
        }
      }
    );
  }, []);

  // Delete user book by key
  const deleteBook = (key) => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this book?',
      [
        {
          text: 'Yes',
          onPress: () => {
            remove(
              ref(database, 'users/' + auth.currentUser.uid + '/books/' + key)
            );
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  // Sign out function that redirects to the sign in page on press
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User logged out');
        navigation.navigate('SignIn');
      })
      .catch((err) => console.error(err));
  };
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
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: 50,
        }}
      >
        <Text style={{ fontSize: 20, marginTop: 50 }}>
          Welcome to your home page, {auth.currentUser.displayName}!
        </Text>
        <Text></Text>
        <Text style={{ fontSize: 16 }}>
          Here you can manage your favorite books.
        </Text>
      </View>
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
          style={{ width: 300 }}
          mode="contained"
          onPress={() => navigation.navigate('Search')}
        >
          Search for books
        </Button>
      </View>
      <View style={{ flex: 5 }}>
        <FlatList
          data={books}
          ListEmptyComponent={() => <Text>{emptyBooks}</Text>}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                borderRadius: 50,
                width: 300,
                alignItems: 'center',
                flexDirection: 'row',
                margin: 20,
                height: 100,
              }}
            >
              <Image
                source={{ uri: item.book.volumeInfo.imageLinks?.thumbnail }}
                style={{ width: 90, height: 124 }}
                on
              />
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 10,
                  marginRight: 10,
                  width: 120,
                }}
              >
                {item.book.volumeInfo.title}
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <IconButton
                  icon="book-edit"
                  iconColor="blue"
                  onPress={() => {
                    navigation.navigate('Book', {
                      item: item,
                    });
                  }}
                >
                  Edit
                </IconButton>
                <IconButton
                  icon="delete"
                  iconColor="red"
                  onPress={() => deleteBook(item.key)}
                  style={{ alignItems: 'flex-start' }}
                >
                  Delete
                </IconButton>
              </View>
            </View>
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={{ width: 300, marginTop: 20 }}
          mode="contained"
          onPress={signOut}
        >
          Sign out
        </Button>
      </View>
    </View>
  );
}
