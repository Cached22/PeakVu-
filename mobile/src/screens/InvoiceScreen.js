import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createInvoice } from '../actions/invoiceActions';
import invoiceApi from '../api/invoiceApi';

const InvoiceScreen = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState({
    materials: [],
    laborCost: '',
    totalCost: '',
  });

  const dispatch = useDispatch();
  const { projectId } = useSelector(state => state.projectReducer);

  useEffect(() => {
    // Fetch project details to be invoiced
    const fetchProjectDetails = async () => {
      try {
        const response = await projectApi.getProjectDetails(projectId);
        setProjectDetails(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...invoiceDetails.materials];
    updatedMaterials[index] = value;
    setInvoiceDetails({ ...invoiceDetails, materials: updatedMaterials });
  };

  const handleCreateInvoice = async () => {
    try {
      const response = await invoiceApi.createInvoice(projectId, invoiceDetails);
      dispatch(createInvoice(response.data));
      alert('Invoice created successfully!');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Invoice Creation</Text>
      {projectDetails && (
        <View>
          <Text style={styles.label}>Project Name: {projectDetails.name}</Text>
          <Text style={styles.label}>Customer: {projectDetails.customer}</Text>
          {projectDetails.materials.map((material, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder="Material cost"
              value={invoiceDetails.materials[index]}
              onChangeText={(value) => handleMaterialChange(index, value)}
            />
          ))}
          <TextInput
            style={styles.input}
            placeholder="Labor Cost"
            value={invoiceDetails.laborCost}
            onChangeText={(value) => setInvoiceDetails({ ...invoiceDetails, laborCost: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Total Cost"
            value={invoiceDetails.totalCost}
            onChangeText={(value) => setInvoiceDetails({ ...invoiceDetails, totalCost: value })}
          />
          <Button title="Create Invoice" onPress={handleCreateInvoice} />
        </View>
      )}
    </ScrollView>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default InvoiceScreen;