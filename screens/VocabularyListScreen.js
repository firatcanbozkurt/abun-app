// In VocabularyListScreen component
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const VocabularyListScreen = () => {
  const [vocabularyData, setVocabularyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('vocabularyData');
        console.log('Retrieved JSON:', jsonValue);
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue);
          if (Array.isArray(data)) {
            const sortedData = data.sort((a, b) => (a.word || '').localeCompare(b.word || ''));
            setVocabularyData(sortedData);
          } else {
            console.error('Fetched data is not an array:', data);
          }
        } else {
          console.log('No data found in AsyncStorage.');
          setVocabularyData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteWord = async (word) => {
    try {
      const jsonValue = await AsyncStorage.getItem('vocabularyData');
      if (jsonValue !== null) {
        let data = JSON.parse(jsonValue);
        data = data.filter(item => item.word !== word);
        await AsyncStorage.setItem('vocabularyData', JSON.stringify(data));
        setVocabularyData(data);
        alert('Kelime başarıyla silindi!');
      }
    } catch (error) {
      console.error('Kelime silme hatası:', error);
      alert('Kelime silme hatası!');
    }
  };

  const refreshScreen = () => {
    setVocabularyData([...vocabularyData]);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Vocabulary Words</Text>
      <TouchableOpacity onPress={refreshScreen}>
        <Text style={{ marginBottom: 10 }}>Refresh Screen</Text>
      </TouchableOpacity>
      <FlatList
  data={vocabularyData}
  keyExtractor={(item, index) => (item.word || index).toString()}
  renderItem={({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
      <Text>
        <Text style={{ fontWeight: 'bold' }}>{item.word}:</Text> {item.description}
      </Text>
      <TouchableOpacity onPress={() => deleteWord(item.word)}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  )}
/>
    </SafeAreaView>
  );
};

export default VocabularyListScreen;
