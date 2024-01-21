import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImagesAndNotes } from '../api/projectApi';
import styles from '../styles/main.css';

const UploadScreen = ({ navigation, route }) => {
  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState('');
  const { projectId } = route.params;

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImages([...images, response]);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ noData: true }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        setImages([...images, response]);
      }
    });
  };

  const handleUpload = async () => {
    try {
      const uploadResponse = await uploadImagesAndNotes(projectId, images, notes);
      if (uploadResponse.status === 200) {
        alert('Images and notes uploaded successfully!');
        navigation.goBack();
      } else {
        alert('Failed to upload images and notes.');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('An error occurred while uploading.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadContainer}>
        <Text style={styles.header}>Upload Images and Notes</Text>
        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={styles.previewImage}
          />
        ))}
        <TextInput
          style={styles.input}
          placeholder="Enter notes here"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UploadScreen;