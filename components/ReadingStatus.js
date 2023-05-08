import { ref, update } from 'firebase/database';
import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { auth, database } from '../firebase/firebase';

const ReadingStatus = (props) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (props.item.status === 'read') {
      setValue('read');
    } else if (props.item.status === 'wanttoread') {
      setValue('wanttoread');
    } else {
      setValue('reading');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{ width: 300, marginTop: 40 }}
        buttons={[
          {
            value: 'read',
            label: 'Read',
            onPress: () => {
              update(
                ref(
                  database,
                  'users/' + auth.currentUser.uid + '/books/' + props.item.key
                ),
                {
                  status: value,
                }
              );
            },
          },
          {
            value: 'wanttoread',
            label: 'To read',
            onPress: () => {
              update(
                ref(
                  database,
                  'users/' + auth.currentUser.uid + '/books/' + props.item.key
                ),
                {
                  status: value,
                }
              );
            },
          },
          {
            value: 'reading',
            label: 'Reading',
            onPress: () => {
              update(
                ref(
                  database,
                  'users/' + auth.currentUser.uid + '/books/' + props.item.key
                ),
                {
                  status: value,
                }
              );
            },
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ReadingStatus;
