import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardData } from '../actions/projectActions';
import ProjectListItem from '../components/ProjectListItem';

const DashboardScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { projects, error } = useSelector(state => state.projectReducer);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchDashboardData());
    setIsLoading(false);
  }, [dispatch]);

  const handleProjectSelect = (projectId) => {
    navigation.navigate('ProjectDetailScreen', { projectId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProjectListItem
              project={item}
              onSelect={() => handleProjectSelect(item._id)}
            />
          )}
        />
      )}
      <Button
        title="Upload New Project"
        onPress={() => navigation.navigate('UploadScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DashboardScreen;