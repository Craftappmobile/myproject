import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button } from '../../components/ui';
import { PlusCircle } from 'lucide-react-native';

// Тимчасові дані для демонстрації
const MOCK_PROJECTS = [
  { id: '1', name: 'Шарф', date: '2025-04-10', status: 'В процесі' },
  { id: '2', name: 'Шапка', date: '2025-04-05', status: 'Завершено' },
  { id: '3', name: 'Светр', date: '2025-03-20', status: 'В процесі' },
];

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  const renderProjectItem = ({ item }: { item: typeof MOCK_PROJECTS[0] }) => (
    <TouchableOpacity style={styles.projectItem}>
      <Card style={styles.projectCard}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={[
            styles.projectStatus,
            item.status === 'Завершено' ? styles.completedStatus : styles.inProgressStatus
          ]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.projectDate}>Створено: {item.date}</Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мої проєкти</Text>
        <Button 
          title="Новий проєкт" 
          onPress={() => {}} 
          size="small"
          style={styles.addButton}
          textStyle={styles.addButtonText}
          icon={<PlusCircle size={16} color="#fff" style={styles.addButtonIcon} />}
        />
      </View>
      
      {projects.length > 0 ? (
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>У вас ще немає проєктів</Text>
          <Button 
            title="Створити перший проєкт" 
            onPress={() => {}} 
            style={styles.createButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    marginLeft: 4,
  },
  addButtonIcon: {
    marginRight: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectCard: {
    padding: 0,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  projectStatus: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inProgressStatus: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
  },
  completedStatus: {
    backgroundColor: '#f6ffed',
    color: '#52c41a',
  },
  projectDate: {
    fontSize: 14,
    color: '#666',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  createButton: {
    width: '100%',
    maxWidth: 250,
  },
});

export default ProjectsList;