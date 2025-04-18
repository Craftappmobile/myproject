import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';

// Тимчасові дані для демонстрації
const dummyFavorites = [
  { id: '2.1', name: 'Витрата пряжі', route: 'YarnCalculator', category: 'Калькулятор пряжі' },
  { id: '3.5', name: 'Росток', route: 'BackNeckCalculator', category: 'Калькулятор моделі реглан - класичний' },
  { id: '10.2', name: 'Шарф', route: 'ScarfCalculator', category: 'Калькулятор петель для аксесуарів' },
];

const FavoritesScreen = ({ navigation }) => {
  const navigateToCalculator = (route) => {
    navigation.navigate(route);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() => navigateToCalculator(item.route)}
    >
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteTitle}>{item.name}</Text>
        <Text style={styles.favoriteCategory}>{item.category}</Text>
      </View>
      <Star size={20} color="#FFD700" fill="#FFD700" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваші обрані калькулятори</Text>
      
      {dummyFavorites.length > 0 ? (
        <FlatList
          data={dummyFavorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            У вас ще немає обраних калькуляторів.
          </Text>
          <Text style={styles.emptySubtext}>
            Додайте калькулятори до обраного, натиснувши на зірочку.
          </Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'Roboto_Bold',
  },
  listContent: {
    paddingBottom: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteContent: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Roboto_Bold',
  },
  favoriteCategory: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Roboto',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Roboto_Bold',
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Roboto',
  },
});

export default FavoritesScreen;