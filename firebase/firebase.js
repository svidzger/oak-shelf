import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { API_FIREBASE } from '@env';

const firebaseConfig = {
  apiKey: API_FIREBASE,
  authDomain: 'react-native-bookapp.firebaseapp.com',
  databaseURL:
    'https://react-native-bookapp-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-native-bookapp',
  storageBucket: 'react-native-bookapp.appspot.com',
  messagingSenderId: '672542853898',
  appId: '1:672542853898:web:6a59887a1cf69052bc88f3',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
