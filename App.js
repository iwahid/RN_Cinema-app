import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import MainScreen from './src/screens/MainScreen';
import FilmDescription from './src/screens/FilmDescriptionScreen';
import { THEME } from './src/theme';
import TicketOrderScreen from './src/screens/TicketOrderScreen';

import {getFilmsList} from './src/utilities/getFilmsList'


const Stack = createStackNavigator();

export default function App() {

  /* TODO: здесь я получаю списки всех доступных фильмов.
    И загружаю по ним: [название, обложка, рейтинг] 
    
    После, при переходе на экран с фильмом, загружаю полный список данных о нём. 
    Сразу же, на этом же экране (с целью оптимизации), после того как загружена основная информация, загружаю и данные о доступных сеансах. Поскольку, если человек открыл описание фильма, то по статистике в 80% случаев он заинтересуется покупкой билета. И что бы не заставлять человека ждать на экране с заказом билетов, оптимизирую этот момент и загружаю данные в момент бездействия пользователя (когда он читает описание фильма и не переходит никуда по экранам)
    */

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
    backgroundColor: THEME.BACKGROUND_COLOR,
    marginTop: 35 /* FIXME: заменить на адекватный статусбар */
  }
});
