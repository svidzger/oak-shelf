import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../firebase/firebase';
import { set, push, remove, ref, onValue } from 'firebase/database';

export default function UserScreen() {
  const [books, setBooks] = React.useState([]);
  const [userBooks, setUserBooks] = React.useState([]);

  const navigation = useNavigation();
  const curruser = {
    uid: auth.currentUser.uid,
    username: auth.currentUser.displayName,
  };

  // Get all user books
  React.useEffect(() => {
    onValue(ref(database, 'books/'), (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      const dataWithKeys = Object.values(data).map((obj, index) => {
        return { ...obj, key: keys[index] };
      });
      setBooks(dataWithKeys);
      //
      // SHOW ONLY CURRENT USER BOOKS
      //
      for (let index = 0; index < books.length; index++) {
        const element = array[index];
        if (element.books.username == auth.currentUser.displayName) {
          setUserBooks(element);
        }
      }
    });
  }, []);

  const deleteBook = (key) => {
    remove(ref(database, `items/${key}`));
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User logged out');
        navigation.navigate('SignIn');
      })
      .catch((error) => console.error(err));
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
        <Text style={{ fontSize: 20 }}>
          Welcome to your home page, {curruser.username}!
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                borderRadius: 50,
                width: 350,
                alignItems: 'center',
                flexDirection: 'row',
                margin: 20,
                height: 100,
              }}
            >
              {/* Fix conditional rendering when thumbnail picture is not avaible */}

              <Image
                source={{ uri: item.book.volumeInfo.imageLinks?.thumbnail }}
                style={{ width: 80, height: 120 }}
                on
              />
              <Text>{item.key}</Text>
              <Text
                onPress={() => deleteBook(item.key)}
                style={{ marginLeft: 10, fontSize: 18, color: '#0000EE' }}
              >
                delete
              </Text>
            </View>
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={{ width: 300, marginTop: 40 }}
          mode="contained"
          onPress={signOut}
        >
          Sign out
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
