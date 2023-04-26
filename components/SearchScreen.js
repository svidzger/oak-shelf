import React, { useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { API_URL, API_KEY } from '@env';
import axios from 'axios';
import BookDialog from './BookDialog';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

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
        backgroundColor: '#FAEDCD',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#D4A373',
          width: '100%',
        }}
      >
        <Searchbar
          style={{ width: 300, backgroundColor: '#CCD5AE', marginTop: 40 }}
          placeholder='Search'
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
          onIconPress={findBooks}
          onSubmitEditing={findBooks}
        />
      </View>
      <View style={{ flex: 5 }}>
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
                backgroundColor: '#FAEDCD',
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
