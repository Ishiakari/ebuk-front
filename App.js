import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CreateBookScreen from './src/screens/CreateBookScreen';
import { COLORS } from './src/theme/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.primaryAction,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false, // Remove border line on header
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Home has its own custom header
        />
        <Stack.Screen 
          name="CreateBook" 
          component={CreateBookScreen} 
          options={{ title: '' }} // Clear default title, screen has its own title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}