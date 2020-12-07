import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import MainScreen from './src/screens/MainScreen';
import FilmDescription from './src/screens/FilmDescriptionScreen';
import { THEME } from './src/theme';
import TicketOrderScreen from './src/screens/TicketOrderScreen';


const DATA = {
  popularList: [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
      title: 'Семейка бигфутов',
      rating: '7.9',
      img: 'https://kinohod.ru/o/5e/5b/5e5b3a52-13b5-48b4-9e21-833ba207c8ee.jpg'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
      title: 'Координаты Скайфолл',
      rating: '1.9',
      img: 'https://plaqat.ru/images/10517.jpg'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d723',
      title: 'Спутник',
      rating: '2.9',
      img: 'https://static.mk.ru/upload/entities/2020/04/29/21/articles/detailPicture/1e/f5/01/9f/5b63adea20a506e7ffe4ebc7d750585d.jpg'
    },
  ],
  otherList: [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b14',
      title: 'Выжившие',
      rating: '3.9',
      img: 'https://www.kino-teatr.ru/movie/posters/big/7/128987.jpg'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f625',
      title: 'Подземка',
      rating: '4.9',
      img: 'https://i.pinimg.com/originals/b1/43/a7/b143a786c09b565dd615a4671cf1dec7.png'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d736',
      title: 'Разлом',
      rating: '5.9',
      img: 'https://upload.wikimedia.org/wikipedia/ru/c/c4/%D0%A0%D0%B0%D0%B7%D0%BB%D0%BE%D0%BC_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2018%29.jpg'
    },
  ]
}

/* NOTE: установил навигацию и карусель */
/* FIXME: импортировать экраны */
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <StatusBar style='auto'></StatusBar>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? THEME.BACKGROUND_COLOR : '#ffffff'
            },
            headerTintColor: Platform.OS === 'android' ? '#ffffff' : THEME.BACKGROUND_COLOR,
            headerTitleStyle: {
              fontWeight: '100',
            },
          }}>
          <Stack.Screen name="home" component={MainScreen} options={{
            headerTitle: 'Кинотеатр',
            headerTintColor: '#fff',
            headerRight: () => (
              <Text>123</Text>
            )
          }} />
          <Stack.Screen name="filmDescription" component={FilmDescription}
            options={{
              headerTitle: 'Описание картины',
              headerTintColor: '#fff',
              headerRight: () => (
                <Text>123</Text>
              )
            }} />
          <Stack.Screen name="ticketOrder" component={TicketOrderScreen}
            options={{
              headerTitle: 'Заказ билета',
              headerTintColor: '#fff',
              headerRight: () => (
                <Text>123</Text>
              )
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 35 /* FIXME: заменить на адекватный статусбар */
  }
});
