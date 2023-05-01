import { DefaultTheme, Provider } from 'react-native-paper';
import Navigation from './components/Navigation';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     secondaryContainer: '#CCD5AE',
//   },
// };

export default function App() {
  return (
    <Provider>
      <Navigation />
    </Provider>
  );
}
