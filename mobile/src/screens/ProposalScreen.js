import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { generatePDF } from '../utils/pdfGenerator';
import { createProposal } from '../api/projectApi';
import { AuthContext } from '../context/AuthContext';

const ProposalScreen = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userToken } = useContext(AuthContext);

  const handleGenerateProposal = async () => {
    setIsLoading(true);
    try {
      const pdfDocument = await generatePDF(projectDetails);
      const response = await createProposal(userToken, pdfDocument);
      if (response.status === 200) {
        alert('Proposal created successfully!');
      } else {
        alert('Failed to create proposal.');
      }
    } catch (error) {
      console.error('Error generating proposal:', error);
      alert('Error generating proposal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Proposal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project details"
        value={projectDetails}
        onChangeText={setProjectDetails}
        multiline
      />
      <Button
        title={isLoading ? 'Generating...' : 'Generate Proposal'}
        onPress={handleGenerateProposal}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default ProposalScreen;