import React, { useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Button, Searchbar, Text } from 'react-native-paper';
import { API_URL, API_KEY } from '@env';
import axios from 'axios';
import BookDialog from '../components/BookDialog';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);
  const navigation = useNavigation();

  const findBooks = () => {
    axios
      .get(`${API_URL}${keyword}:keyes&key=${API_KEY}`)
      .then((res) => {
        setResult(res.data.items);
      })
      .catch((err) => {
        console.error(err);
      });
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
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Searchbar
          style={{ width: 300, marginTop: 40 }}
          placeholder='Search'
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
          onIconPress={findBooks}
          onSubmitEditing={findBooks}
        />
      </View>
      <View style={{ flex: 5 }}>
        <Button onPress={() => navigation.goBack()}>User Profile</Button>
        <FlatList
          data={result}
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
                source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
                style={{ width: 80, height: 120 }}
                on
              />
              <BookDialog item={item} />
            </View>
          )}
        />
      </View>
    </View>
  );
}
