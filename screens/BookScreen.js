import React from 'react';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BookRating from '../components/BookRating';
import ReadingStatus from '../components/ReadingStatus';

function BookScreen({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 36, padding: 2, marginTop: 50 }}>
          {item.book.volumeInfo.title}
        </Text>
        <Text style={{ fontSize: 18, padding: 2 }}>
          By: {item.book.volumeInfo.authors}
        </Text>
        <Image
          source={{ uri: item.book.volumeInfo.imageLinks?.thumbnail }}
          style={{ width: 250, height: 350, marginTop: 20 }}
          on
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BookRating item={item} />
        <ReadingStatus item={item} />
        <Button
          style={{ marginBottom: 40, width: 300 }}
          mode="contained"
          onPress={() => navigation.goBack()}
        >
          Back
        </Button>
      </View>
    </View>
  );
}

export default BookScreen;
