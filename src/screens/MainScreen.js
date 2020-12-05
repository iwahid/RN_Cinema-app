import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FilmsSlider from '../components/FilmsSlider'


import { DATA } from '../data'

const MainScreen = (props) => {
  /* FIXME: заменить на нормальные данные */
  /*  const { popularList, otherList } = props.data */
  const { popularList, otherList } = DATA
  const navigation = props.navigation


  const renderItem = ({ item }) => {
    console.log(item.img)
    return (
      <View style={styles.item}>
        <View style={styles.carouselImageWrapper}>
          <Image source={{
            uri: item.img,
          }} style={styles.carouselImage} />
        </View>


        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
    );
  }


  return (
    /* 
    1. Главный список с фильмами
    2. Два второстепенных списка */
    <View style={styles.container}>
      <ScrollView>

        <FilmsSlider navigation={navigation} size='large' sliderTitle='Новинки' filmsList={popularList}>   </FilmsSlider>
        <FilmsSlider navigation={navigation} size='small' sliderTitle='Популярное' filmsList={otherList}>   </FilmsSlider>
        <FilmsSlider navigation={navigation} size='small' sliderTitle='Успей посмотреть' filmsList={otherList}>   </FilmsSlider>
        <FilmsSlider navigation={navigation} size='small' sliderTitle='Скоро в показе' filmsList={otherList}>   </FilmsSlider>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#191919'
  },
});

export default MainScreen;