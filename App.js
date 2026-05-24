import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { COLORS } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121A27' }}>
      {/* Ensures the top phone status bar text matches your dark theme colors */}
      <StatusBar barStyle="light-content" backgroundColor="#121A27" />
      
      {/* Renders your beautiful home screen design directly */}
      <HomeScreen navigation={mockNavigation} />
    </SafeAreaView>
  );
}

// Simple placeholder navigation object to prevent any button errors during the UI test
const mockNavigation = {
  navigate: (screenName) => alert(`Routing path simulated to: ${screenName}`),
};