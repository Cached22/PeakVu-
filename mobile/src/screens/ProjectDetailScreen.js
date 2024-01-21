import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { projectApi } from '../api/projectApi';
import { uploadApi } from '../api/uploadApi';
import { quoteApi } from '../api/quoteApi';
import { invoiceApi } from '../api/invoiceApi';
import { feedbackApi } from '../api/feedbackApi';

const ProjectDetailScreen = ({ route }) => {
  const { projectId } = route.params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await projectApi.getProjectDetails(projectId);
        setProject(response.data);
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleGenerateQuote = async () => {
    try {
      const quote = await quoteApi.generateQuote(projectId);
      console.log('Quote generated:', quote);
    } catch (error) {
      console.error('Failed to generate quote:', error);
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const invoice = await invoiceApi.createInvoice(projectId);
      console.log('Invoice created:', invoice);
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  const handleUploadImage = async (imageUri) => {
    try {
      const uploadResponse = await uploadApi.uploadImage(projectId, imageUri);
      console.log('Image uploaded:', uploadResponse);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleSubmitFeedback = async (feedbackText) => {
    try {
      const feedbackResponse = await feedbackApi.submitFeedback(projectId, feedbackText);
      console.log('Feedback submitted:', feedbackResponse);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading project details...</Text>
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>No project details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>
      <View style={styles.imageContainer}>
        {project.images.map((image, index) => (
          <Image key={index} source={{ uri: image.url }} style={styles.image} />
        ))}
      </View>
      <Text style={styles.sectionTitle}>Notes</Text>
      <Text style={styles.notes}>{project.notes}</Text>
      <TouchableOpacity style={styles.button} onPress={handleGenerateQuote}>
        <Text style={styles.buttonText}>Generate Quote</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCreateInvoice}>
        <Text style={styles.buttonText}>Create Invoice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleUploadImage('path/to/image')}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmitFeedback('Great job!')}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  notes: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectDetailScreen;