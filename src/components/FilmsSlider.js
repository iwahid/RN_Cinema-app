import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons'
import Rating from './UI/Rating'



const FilmsSlider = ({ navigation, size, sliderTitle, filmsList }) => {

  function openFilmHandler(filmList, id) {
    navigation.navigate('filmDescription', { filmId: id, filmsList })
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => openFilmHandler(filmsList, item.id)}>{/* вызываю колбек, в котором возвращаю выбранный айтем */}
        <View style={styles.item}>

          <View style={styles.carouselImageWrapper}>
            <Image source={{ uri: item.img }} style={styles.carouselImage} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>
            <Rating style={styles.rating} rating={item.rating}></Rating>
          </Text>
        </View>

      </TouchableOpacity>
    );
  }

  /* FIXME: переместить стили. Находятся внутри компонента, потому что внутри подсчёт размеров и отступов */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 20
    },
    listTitle: {
      color: '#fff',
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 20
    },
    item: {
      width: (size === 'large' ? 270 : 160),
      height: (size === 'large' ? 470 : 330),
      marginHorizontal: 10,
      marginStart: 0,
    },
    carouselImageWrapper: {
      height: (size === 'large' ? 400 : 240),
      marginBottom: 10,
      elevation: 5
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      resizeMode: 'cover'
    },
    title: {
      color: '#fff',
      fontSize: 22,
      fontWeight: "400",
      marginBottom: 5,

    },
    rating: {
      color: '#ccc',
      fontSize: 12,
      fontWeight: "400",
      marginBottom: 50
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>{sliderTitle}</Text>
      <FlatList style={styles.spec}
        data={filmsList}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default FilmsSlider;