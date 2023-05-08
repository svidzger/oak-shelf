import * as React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { auth, database } from '../firebase/firebase';
import { push, ref } from 'firebase/database';

const BookDialog = (props) => {
  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const { colors } = useTheme();
  const showDialog = () => {
    setVisibleDialog(true);
  };

  const hideDialog = () => setVisibleDialog(false);

  const wantToRead = () => {
    if (auth.currentUser) {
      push(ref(database, 'users/' + auth.currentUser.uid + '/books'), {
        book: props.item,
        status: 'wanttoread',
        rating: 0,
      });
      setVisibleDialog(false);
      Alert.alert('Book added to Want to read!');
    } else {
      Alert.alert('Somethin went wrong!');
    }
  };

  const haveRead = () => {
    if (auth.currentUser) {
      push(ref(database, 'users/' + auth.currentUser.uid + '/books'), {
        book: props.item,
        status: 'read',
        rating: 0,
      });
      setVisibleDialog(false);
      Alert.alert('Book added to Read!');
    } else {
      Alert.alert('Somethin went wrong!');
    }
  };

  const reading = () => {
    if (auth.currentUser) {
      push(ref(database, 'users/' + auth.currentUser.uid + '/books'), {
        book: props.item,
        status: 'reading',
        rating: 0,
      });
      setVisibleDialog(false);
      Alert.alert('Book added to Reading!');
    } else {
      Alert.alert('Something went wrong!');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // Touchable opasity color
          // backgroundColor: colors.surfaceVariant,
          padding: 10,
          height: 100,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        }}
        onPress={showDialog}
      >
        <Text style={{ fontSize: 18 }}>{props.item.volumeInfo.title}</Text>
        <Text style={{ fontSize: 14 }}>
          Author: {props.item.volumeInfo.authors}
        </Text>
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>{props.item.volumeInfo.title}</Dialog.Title>
          <View style={{ height: 300 }}>
            <Dialog.ScrollArea>
              <Text style={{ marginBottom: 10 }} variant="bodyMedium">
                Book description:
              </Text>
              <ScrollView
                pagingEnabled={true}
                bounces
                contentContainerStyle={{ paddingHorizontal: 24 }}
              >
                <Text>{props.item.volumeInfo.description}</Text>
              </ScrollView>
            </Dialog.ScrollArea>
          </View>
          <Dialog.Content>
            <FlatList
              data={props.item.volumeInfo.categories}
              renderItem={({ item }) => <Text>Categories: {item}</Text>}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={haveRead}>Read</Button>
            <Button onPress={wantToRead}>Want to read</Button>
            <Button onPress={reading}>Reading</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default BookDialog;
