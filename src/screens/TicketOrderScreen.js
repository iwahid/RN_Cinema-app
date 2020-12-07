import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import DATA from './../data'
import Rating from './../components/UI/Rating'
import { THEME } from '../theme'
import FormButton from '../components/UI/Button'
import Separator from '../components/UI/Separator'

function TicketOrderScreen(props) {

  const { film } = props.route.params
  const filmId = film.id

  const [dateChoose, setDateChoose] = useState('14 Марта')
  const [timeChoose, setTimeChoose] = useState('14:20')

  const dateList = ['14 Марта', '15 Марта', '16 Марта', '17 Марта', '18 Марта', '19 Марта']
  const timeList = ['10:20', '12:30', '12:40', '14:20', '16:10', '18:00', '20:20']

  const chooseItem = (item, type) => {

    /* за подобные вещи нужно отрубать руки и скармливать их индийским крокодилам */
    if (type == 'date') {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setDateChoose(item)}>
          <Text style={dateChoose == item ? { ...styles.chooseItemText, ...styles.chooseItemTextActive } : styles.chooseItemText}>
            {item}
          </Text>
        </TouchableOpacity>
      )
    }
    if (type == 'time') {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setTimeChoose(item)}>
          <Text style={timeChoose == item ? { ...styles.chooseItemText, ...styles.chooseItemTextActive } : styles.chooseItemText}>
            {item}
          </Text>
        </TouchableOpacity>

      )
    }

  }

  return (
    <View style={styles.container}>
      {/* FIXME: возможно, верхнюю часть страницы можно вынести в отдельный комопонент. Но пока они слишком различны, и их кастомизация по переданным параметрам по трудоёмкости будет сравнима с написанием отдельных компонентов */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <ImageBackground source={{ uri: film.img }} style={styles.bgImage}>
            <ImageBackground source={require('./../../assets/Shadow4.png')} style={styles.bgShadow}>
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

        <View style={styles.body}>
          <Separator></Separator>

          <View style={styles.optionsChoose}>
            <View style={styles.сhooseWrapper}>
              <Text style={styles.сhooseTitle}>Дата показа</Text>
              <ScrollView style={styles.dateList} horizontal={true}>
                {dateList.map(item => chooseItem(item, type = 'date'))}
              </ScrollView>
            </View>


            <View style={styles.сhooseWrapper}>
              <Text style={styles.сhooseTitle}>Время показа</Text>
              <ScrollView style={styles.dateList} horizontal={true}>
                {timeList.map(item => chooseItem(item, type = 'time'))}
              </ScrollView>
            </View>
          </View>

          <Separator></Separator>
          

        </View>


      </ScrollView>
      <View style={styles.formButtonWrapper}>
        <FormButton buttonTitle="Выбрать сеанс"></FormButton>
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
    marginBottom: 65,
  },
  header: {
    height: 150,
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
    paddingLeft: 15,

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


  /* ///////////////// body //////////////// */
  /*  FIXME: сделать анимированный выбор items */
  body: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  optionsChoose: {
    marginVertical: 15,
  },
  сhooseWrapper: {
    marginBottom: 15,
  },
  сhooseTitle: {
    color: '#999',
    fontSize: 12
  },
  dateList: {
    marginVertical: 15,
  },
  chooseItemText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 15,
    fontSize: 14,
    borderColor: '#fff',
    color: '#fff',
    lineHeight: 20,
  },
  chooseItemTextActive: {
    borderColor: THEME.ACCENT_COLOR,
    color: '#05CB81'
  },






  formButtonWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 10,
  },
})

export default TicketOrderScreen
