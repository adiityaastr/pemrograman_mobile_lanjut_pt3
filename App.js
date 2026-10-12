import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import { COLORS } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {/* Stack Navigation: Home -> Detail -> Checkout */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '☕ KopiKita' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Menu' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Konfirmasi Pesanan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
