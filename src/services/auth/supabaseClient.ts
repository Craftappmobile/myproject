import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Отримуємо URL та ключ Supabase з конфігурації Expo
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';

// Виводимо попередження, якщо змінні не налаштовані
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL або ключ не налаштовані. Перевірте .env файл та app.config.js.'
  );
}

// Створюємо клієнт Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Для відлагодження
console.log('Supabase URL:', supabaseUrl ? 'Налаштовано' : 'Не налаштовано');
console.log('Supabase Key:', supabaseAnonKey ? 'Налаштовано' : 'Не налаштовано');

export default supabase;
