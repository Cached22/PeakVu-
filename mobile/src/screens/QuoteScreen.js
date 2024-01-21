import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { quoteApi } from '../api/quoteApi';
import { AuthContext } from '../store/store';

const QuoteScreen = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [quote, setQuote] = useState(null);
  const { state } = useContext(AuthContext);

  const handleQuoteRequest = async () => {
    try {
      const response = await quoteApi.generateQuote(state.userToken, { details: projectDetails });
      setQuote(response.data);
    } catch (error) {
      console.error('Error generating quote:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project details"
        value={projectDetails}
        onChangeText={setProjectDetails}
        multiline
      />
      <Button title="Generate Quote" onPress={handleQuoteRequest} />
      {quote && (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteTitle}>Generated Quote:</Text>
          <Text style={styles.quoteText}>{quote.total}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  quoteContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quoteText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default QuoteScreen;