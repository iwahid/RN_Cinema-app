import React, { useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FilmsSlider from '../components/FilmsSlider'


import { DATA } from '../data'
import { THEME } from '../theme';

const MainScreen = (props) => {
  /* FIXME: заменить на нормальные данные */
  const { popularList, otherList } = DATA
  const navigation = props.navigation


  const renderItem = ({ item }) => {
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
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor:  THEME.BACKGROUND_COLOR,
  },
});

export default MainScreen;