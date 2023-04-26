import * as React from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, Text, IconButton } from 'react-native-paper';

const BookDialog = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => {
    console.log(props.item.volumeInfo.title);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const wantToRead = () => {
    console.log('Want to read that book');
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#CCD5AE',
          padding: 10,
          height: 100,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        }}
        onPress={showDialog}
      >
        <Text style={{ fontSize: 18 }}>{props.item.volumeInfo.title}</Text>
        <Text style={{ fontSize: 14 }}>
          {' '}
          Author: {props.item.volumeInfo.authors}
        </Text>
      </TouchableOpacity>
      <Portal>
        <Dialog
          style={{ backgroundColor: '#FAEDCD' }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>{props.item.volumeInfo.title}</Dialog.Title>
          <View style={{ height: 300 }}>
            <Dialog.ScrollArea>
              <Text variant='bodyMedium'>Book description:</Text>
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
            <Button onPress={wantToRead}>Want to read</Button>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default BookDialog;
