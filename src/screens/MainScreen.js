import React, { useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FilmsSlider from '../components/FilmsSlider'

import { DATA } from '../data'
import { THEME } from '../theme';

const MainScreen = (props) => {
  /* FIXME: заменить моковые данные на данные, полученные из API */
  const { popularList, otherList } = DATA
  const navigation = props.navigation

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