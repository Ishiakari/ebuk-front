import AsyncStorage from '@react-native-async-storage/async-storage';

const READING_PROGRESS_KEY = '@reading_progress_';

export const saveReadingProgress = async (bookId, pageNumber) => {
  try {
    const key = `${READING_PROGRESS_KEY}${bookId}`;
    await AsyncStorage.setItem(key, JSON.stringify({ pageNumber, timestamp: Date.now() }));
  } catch (error) {
    console.error('Error saving reading progress:', error);
  }
};

export const getReadingProgress = async (bookId) => {
  try {
    const key = `${READING_PROGRESS_KEY}${bookId}`;
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const progress = JSON.parse(data);
      return progress.pageNumber;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving reading progress:', error);
    return null;
  }
};

export const clearReadingProgress = async (bookId) => {
  try {
    const key = `${READING_PROGRESS_KEY}${bookId}`;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing reading progress:', error);
  }
};
