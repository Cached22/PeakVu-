import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { submitFeedback } from '../actions/feedbackActions';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch();

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
      return;
    }

    dispatch(submitFeedback(feedback));
    Alert.alert('Success', 'Your feedback has been submitted.');
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button
        title="Submit Feedback"
        onPress={handleFeedbackSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f7f7f7',
    textAlignVertical: 'top',
    minHeight: 100,
  },
});

export default FeedbackScreen;