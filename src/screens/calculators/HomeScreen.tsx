import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Accordion } from '../../components/ui';
import { Star, Search, Bell, Menu as MenuIcon } from 'lucide-react-native';

// Дані категорій та підкатегорій
const categories = [
  {
    id: 1,
    name: 'Адаптація МК',
    subcategories: [
      { id: '1.1', name: 'Адаптація МК', route: 'AdaptationCalculator' }
    ]
  },
  {
    id: 2,
    name: 'Калькулятор пряжі',
    subcategories: [
      { id: '2.1', name: 'Витрата пряжі', route: 'YarnCalculator' },
      { id: '2.2', name: 'Розрахунок складань', route: 'YarnCombinationCalculator' },
      { id: '2.3', name: 'Розрахунок додаткової нитки', route: 'AdditionalYarnCalculator' },
      { id: '2.4', name: 'Розрахунок щільності на основі зразка', route: 'GaugeCalculator' }
    ]
  },
  {
    id: 3,
    name: 'Калькулятор моделі реглан - класичний',
    subcategories: [
      { id: '3.1', name: 'Розрахунок горловини', route: 'NecklineCalculator' },
      { id: '3.2', name: 'Розподіл петель на реглан', route: 'RaglanDistributionCalculator' },
      { id: '3.3', name: 'Довжина регланної лінії', route: 'RaglanLengthCalculator' },
      { id: '3.4', name: 'Прибавки реглану', route: 'RaglanIncreasesCalculator' },
      { id: '3.5', name: 'Росток', route: 'BackNeckCalculator' },
      { id: '3.6', name: 'Коригування розподілу петель відповідно ростка', route: 'BackNeckAdjustmentCalculator' },
      { id: '3.7', name: 'Точки розвороту при в\'язанні ростка', route: 'BackNeckTurningPointsCalculator' },
      { id: '3.8', name: 'Убавки для формування реглану при в\'язанні знизу', route: 'BottomUpRaglanDecreasesCalculator' }
    ]
  },
  {
    id: 4,
    name: 'Калькулятор петель підрізів',
    subcategories: [
      { id: '4.1', name: 'Калькулятор петель підрізів', route: 'UndercutCalculator' }
    ]
  },
  {
    id: 5,
    name: 'Калькулятор моделі кругла кокетка',
    subcategories: [
      { id: '5.1', name: 'Висота круглої кокетки', route: 'YokeHeightCalculator' },
      { id: '5.2', name: 'Розрахунок прибавок', route: 'YokeIncreasesCalculator' }
    ]
  },
  {
    id: 6,
    name: 'Калькулятор убавок і прибавок рукава',
    subcategories: [
      { id: '6.1', name: 'Калькулятор убавок і прибавок рукава', route: 'SleeveCalculator' }
    ]
  },
  {
    id: 7,
    name: 'Калькулятор моделі реглан-погон',
    subcategories: [
      { id: '7.1', name: 'Реглан-погон', route: 'SaddleShoulderCalculator' }
    ]
  },
  {
    id: 8,
    name: 'Калькулятор моделі спущене плече',
    subcategories: [
      { id: '8.1', name: 'Скільки набрати петель', route: 'DroppedShoulderCastOnCalculator' },
      { id: '8.2', name: 'Ширина горловини', route: 'DroppedShoulderNecklineCalculator' },
      { id: '8.3', name: 'Ширина плеча та скоси', route: 'DroppedShoulderWidthCalculator' },
      { id: '8.4', name: 'Поглиблення горловини', route: 'DroppedShoulderNeckDepthCalculator' }
    ]
  },
  {
    id: 9,
    name: 'Калькулятор V-горловина',
    subcategories: [
      { id: '9.1', name: 'Убавки V-горловини', route: 'VNeckDecreaseCalculator' },
      { id: '9.2', name: 'Прибавки V-горловини', route: 'VNeckIncreaseCalculator' }
    ]
  },
  {
    id: 10,
    name: 'Калькулятор петель для аксесуарів',
    subcategories: [
      { id: '10.1', name: 'Шапка', route: 'HatCalculator' },
      { id: '10.2', name: 'Шарф', route: 'ScarfCalculator' },
      { id: '10.3', name: 'Шкарпетки', route: 'SocksCalculator' },
      { id: '10.4', name: 'Рукавички', route: 'GlovesCalculator' },
      { id: '10.5', name: 'Плед', route: 'BlanketCalculator' }
    ]
  }
];

const HomeScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (itemId: string) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const navigateToCalculator = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* Верхня панель */}
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.logo}>🧶</Text>
        <View style={styles.toolbarIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Search size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Star size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Слоган */}
      <Text style={styles.slogan}>Розрахуй і в'яжи, петля в петлю!</Text>

      {/* Акордеон з категоріями */}
      <ScrollView style={styles.content}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryContainer}>
            <Accordion title={category.name}>
              <View>
                {category.subcategories.map(subcategory => (
                  <TouchableOpacity
                    key={subcategory.id}
                    style={styles.subcategoryItem}
                    onPress={() => navigateToCalculator(subcategory.route)}
                  >
                    <Text style={styles.subcategoryText}>• {subcategory.name}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(subcategory.id)}>
                      <Star
                        size={20}
                        color={favorites.includes(subcategory.id) ? "#FFD700" : "#ccc"}
                        fill={favorites.includes(subcategory.id) ? "#FFD700" : "none"}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </Accordion>
            <TouchableOpacity 
              style={styles.favoriteIcon}
              onPress={() => toggleFavorite(`cat_${category.id}`)}
            >
              <Star
                size={20}
                color={favorites.includes(`cat_${category.id}`) ? "#FFD700" : "#ccc"}
                fill={favorites.includes(`cat_${category.id}`) ? "#FFD700" : "none"}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    fontSize: 24,
  },
  toolbarIcons: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
  },
  slogan: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    fontFamily: 'Roboto_Bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 16,
    right: 48,
    zIndex: 1,
  },
  subcategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subcategoryText: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});

export default HomeScreen;