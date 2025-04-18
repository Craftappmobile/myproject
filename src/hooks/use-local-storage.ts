import AsyncStorage from "@react-native-async-storage/async-storage"; import { useState, useEffect } from "react";  export function useLocalStorage() {   const [isReady, setIsReady] = useState(false);    useEffect(() => {     setIsReady(true);   }, []);    const getItem = async (key: string) => {     try {       const value = await AsyncStorage.getItem(key);       return value;     } catch (error) {       console.error("Error getting item from AsyncStorage:", error);       return null;     }   };    const setItem = async (key: string, value: string) => {     try {       await AsyncStorage.setItem(key, value);       return true;     } catch (error) {       console.error("Error setting item in AsyncStorage:", error);       return false;     }   };    const removeItem = async (key: string) => {     try {       await AsyncStorage.removeItem(key);       return true;     } catch (error) {       console.error("Error removing item from AsyncStorage:", error);       return false;     }   };    return { getItem, setItem, removeItem, isReady }; }
