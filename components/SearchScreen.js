import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import {
  Searchbar,
  Card,
  Text,
  Button,
  Avatar,
  List,
} from 'react-native-paper';
import { API_URL, API_KEY } from '@env';
import axios from 'axios';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState([]);

  const findBooks = () => {
    axios
      .get(`${API_URL}${keyword}:keyes&key=${API_KEY}`)
      .then((res) => {
        console.log(res.data.items[0].volumeInfo.title);
        setResult(res.data.items);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openBook = () => {};

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
        }}
      >
        <Searchbar
          style={{ width: 300, backgroundColor: '#D4A373' }}
          placeholder='Search'
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
          onIconPress={findBooks}
          onSubmitEditing={findBooks}
        />
      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={result}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderRadius: 50,
                width: 380,
                alignItems: 'center',
                flexDirection: 'row',
                margin: 20,
                height: 100,
                backgroundColor: '#CCD5AE',
              }}
            >
              <Image
                source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                style={{ width: 80, height: 120 }}
              />
              <Text variant='bodyLarge' style={{ paddingLeft: 20, width: 280 }}>
                {item.volumeInfo.title}
                {'\n'}
                Authors: {item.volumeInfo.authors[0]}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
