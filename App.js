import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider } from 'react-native-paper';
import MyTabs from './components/MyTabs';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent', // disable the little highlighting oval on tab press
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
