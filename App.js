import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider } from 'react-native-paper';
import MyTabs from './components/MyTabs';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#CCD5AE',
  },
};

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
