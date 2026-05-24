import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CreateBookScreen from './src/screens/CreateBookScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import EditBookScreen from './src/screens/EditBookScreen';
import ReadContentScreen from './src/screens/ReadContentScreen';
import { COLORS } from './src/theme/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateBook" component={CreateBookScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="EditBook" component={EditBookScreen} />
        <Stack.Screen name="ReadContent" component={ReadContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}