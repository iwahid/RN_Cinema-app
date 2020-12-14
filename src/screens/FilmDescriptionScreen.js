import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Rating from './../components/UI/Rating'
import { THEME } from '../theme'
import FormButton from '../components/UI/Button'
import CustomText from '../components/UI/CustomText'

/**
 * Компонент, представляющий собой отдельную страницу с детальным описанием фильма. Позволяет перейти к выбору сеанса на этот фильм
 * @return {View} Компонент.
 */
function FilmDescription(props) {

  /* некоторые данные, переданные из React компонента, а не экрана Stack.screen. */
  const { filmId, filmsList } = props.route.params
  const film = filmsList.find(film => film.id == filmId)

  function ticketOrderHandler(id) {
    props.navigation.navigate('ticketOrder', { film })
  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <ImageBackground source={{ uri: film.img }} style={styles.bgImage}>
            <ImageBackground source={require('./../../assets/Shadow3.png')} style={styles.bgShadow}>
              <View style={styles.headerInfo}>
                <Text style={styles.filmTitle}>{film.title}</Text>
                <View style={styles.genreList}>
                  <Text style={styles.filmGenre}>Фантастика</Text>
                  <Text style={styles.filmGenre}>Боевик</Text>
                  <Text style={styles.filmGenre}>Драма</Text>
                </View>
                <View style={styles.otherInfoList}>
                  <Text style={styles.otherInfo}>2012</Text>
                  <Text style={styles.otherInfo}>США</Text>
                  <Text style={styles.otherInfo}>02:43:00</Text>
                </View>
                <View style={styles.rating}><Rating rating={film.rating}></Rating></View>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
        <View style={styles.filmPlot}>
          <CustomText type={'h3'}>Сюжет</CustomText>
          <Text style={styles.filmPlotDescription}>{'\t'}{'\t'}{film.description}</Text>
        </View>
        {/* FIXME: можно добавить слайдер с кадрами/постерами из фильма (если такие получится найти через API) */}
      </ScrollView>
      <View style={styles.formButtonWrapper}>
        <FormButton onPress={() => ticketOrderHandler()} >Выбрать сеанс</FormButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: THEME.BACKGROUND_COLOR,
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 65
  },
  header: {
    height: 350,
    width: '100%',
    marginBottom: 20
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  bgShadow: {
    height: '100%'
  },



  headerInfo: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,

  },
  filmTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
    color: '#fff',
    elevation: 2
  },
  genreList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filmGenre: {
    fontSize: 10,
    padding: 1,
    paddingHorizontal: 4,
    borderRadius: 5,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    opacity: 0.3
  },/* FIXME: разделить ответственность между контейнером рейтинга и самим компонентом */
  otherInfoList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  otherInfo: {
    fontSize: 8,
    padding: 1,
    paddingHorizontal: 5,
    color: '#fff',
    opacity: 0.3
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 5
  },


  filmPlot: {
    padding: 10,
  },
  filmPlotTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: '#fff'
  },
  filmPlotDescription: {
    fontSize: 14,
    borderColor: '#fff',
    color: '#fff',
    opacity: 0.7,
    lineHeight: 20,
    textAlign: 'justify'
  },



  formButtonWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 10,
  },
})

export default FilmDescription
