import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { YarnCalculator, HomeScreen, FavoritesScreen, SearchScreen, NotificationsScreen } from './src/screens/calculators';
import { ProjectsList } from './src/screens/projects';
import { DatabaseProvider, AuthProvider, useAuth } from './src/context';
import * as Font from 'expo-font';
import { Calculator, Bookmark, Settings } from 'lucide-react-native';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

// Створюємо навігатори
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Навігатор для калькуляторів
const CalculatorsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeScreen" 
      component={HomeScreen} 
      options={{ title: 'Калькулятори', headerShown: false }}
    />
    <Stack.Screen 
      name="YarnCalculator" 
      component={YarnCalculator} 
      options={{ title: 'Калькулятор пряжі' }}
    />
    <Stack.Screen 
      name="Favorites" 
      component={FavoritesScreen} 
      options={{ title: 'Обране' }}
    />
    <Stack.Screen 
      name="Search" 
      component={SearchScreen} 
      options={{ title: 'Пошук', headerShown: false }}
    />
    <Stack.Screen 
      name="Notifications" 
      component={NotificationsScreen} 
      options={{ title: 'Сповіщення' }}
    />
    {/* Тут можна додати інші калькулятори */}
  </Stack.Navigator>
);

// Навігатор для проєктів
const ProjectsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProjectsList" 
      component={ProjectsList} 
      options={{ title: 'Мої проєкти' }}
    />
    {/* Тут можна додати екрани для деталей проєкту, створення проєкту тощо */}
  </Stack.Navigator>
);

// Екран налаштувань
const SettingsScreen = () => (
  <View style={styles.centeredContainer}>
    <Text style={styles.title}>Налаштування</Text>
    <Text style={styles.subtitle}>Версія 1.0.0</Text>
  </View>
);

// Компонент для відображення під час завантаження
const LoadingScreen = () => (
  <View style={styles.centeredContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Завантаження додатку...</Text>
  </View>
);

// Імпортуємо реальні екрани автентифікації
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';

// Навігатор для аутентифікації
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

// Компоненти для бічного меню
const ProfileScreen = () => (
  <View style={styles.centeredContainer}>
    <Text style={styles.title}>Профіль</Text>
  </View>
);

const CommunityScreen = () => (
  <View style={styles.centeredContainer}>
    <Text style={styles.title}>Спільнота</Text>
  </View>
);

const GalleryScreen = () => (
  <View style={styles.centeredContainer}>
    <Text style={styles.title}>Галерея</Text>
  </View>
);

// Головний навігатор з бічним меню
const MainNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#fff',
        width: 240,
      },
      drawerLabelStyle: {
        fontFamily: 'Roboto',
      },
    }}
  >
    <Drawer.Screen 
      name="Home" 
      component={TabNavigator} 
      options={{ 
        headerShown: false,
        title: 'Головна'
      }}
    />
    <Drawer.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ title: 'Профіль' }}
    />
    <Drawer.Screen 
      name="Projects" 
      component={ProjectsStack} 
      options={{ title: 'Мої проєкти' }}
    />
    <Drawer.Screen 
      name="Community" 
      component={CommunityScreen} 
      options={{ title: 'Спільнота' }}
    />
    <Drawer.Screen 
      name="Gallery" 
      component={GalleryScreen} 
      options={{ title: 'Галерея' }}
    />
    <Drawer.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{ title: 'Налаштування' }}
    />
  </Drawer.Navigator>
);

// Навігатор з вкладками
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Calculators') {
          return <Calculator size={size} color={color} />;
        } else if (route.name === 'Projects') {
          return <Bookmark size={size} color={color} />;
        } else if (route.name === 'Settings') {
          return <Settings size={size} color={color} />;
        }
        return null;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        elevation: 8,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
      },
    })}
  >
    <Tab.Screen 
      name="Calculators" 
      component={CalculatorsStack} 
      options={{ 
        headerShown: false,
        title: 'Калькулятори'
      }}
    />
    <Tab.Screen 
      name="Projects" 
      component={ProjectsStack} 
      options={{ 
        headerShown: false,
        title: 'Проєкти'
      }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{ title: 'Налаштування' }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Завантаження додатку з шрифтами
    const prepareApp = async () => {
      try {
        // Завантажуємо шрифти
        await Font.loadAsync({
          'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto_Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
        
        // Інша ініціалізація ресурсів
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsAppReady(true);
      } catch (e) {
        console.warn('Помилка при підготовці додатку:', e);
        console.error(e);
        setIsAppReady(true); // Все одно показуємо додаток
      }
    };

    prepareApp();
  }, []);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DatabaseProvider>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </DatabaseProvider>
      </AuthProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

// Компонент, який відображає відповідний навігатор залежно від стану автентифікації
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // Створюємо окремий стек для головного навігатора
  const MainStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );

  return user ? <MainStack /> : <AuthNavigator />;
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
});
