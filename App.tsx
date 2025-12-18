import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { JobsListScreen } from './src/screens/JobsListScreen';
import { JobDetailScreen } from './src/screens/JobDetailScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components',
]);


export type RootStackParamList = {
  Jobs: undefined;
  JobDetail: { job: Job };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Jobs" component={JobsListScreen} />
        <Stack.Screen
          name="JobDetail"
          component={JobDetailScreen}
          options={{ title: 'Detalle del empleo' }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favoritos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
