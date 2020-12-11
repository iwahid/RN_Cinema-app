import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button } from 'react-native'
import DATA from './../data'
import Rating from './../components/UI/Rating'
import { THEME } from '../theme'
import FormButton from '../components/UI/Button'
import Separator from '../components/UI/Separator'
import HallLayout from '../components/HallLayout'

function TicketOrderScreen(props) {

  const { film } = props.route.params
  const filmId = film.id

  const [dateChoose, setDateChoose] = useState('14 Марта')
  const dateList = ['14 Марта', '15 Марта', '16 Марта', '17 Марта', '18 Марта', '19 Марта']

  const [timeChoose, setTimeChoose] = useState('14:20')
  const timeList = ['10:20', '12:30', '12:40', '14:20', '16:10', '18:00', '20:20']


  const chooseItem = (item, type, index) => {

    /* за подобные вещи нужно отрубать руки и скармливать их индийским крокодилам */
    if (type == 'date') {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setDateChoose(item)} key={index}>
          <Text style={dateChoose == item ? { ...styles.chooseItemText, ...styles.chooseItemTextActive } : styles.chooseItemText}>
            {item}
          </Text>
        </TouchableOpacity>
      )
    }

    if (type == 'time') {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setTimeChoose(item)} key={index}>
          <Text style={timeChoose == item ? { ...styles.chooseItemText, ...styles.chooseItemTextActive } : styles.chooseItemText}>
            {item}
          </Text>
        </TouchableOpacity>
      )
    }
  }


  /* хук, для хранения всех данных, о выбранном сеансе */
  const [orderParams, setOrderParams] = useState({
    filmId: '',
    showDate: '',
    showTime: '',
    places: []
  })

  /* хук и функция, для получения возвращаемых значений из HallLayout. Значения возвращаются не в качестве объекта (при импорте и вызове компонента), а через колбек функцию с хуками. Использую "подъём состояния" */
  const [places, setPlaces] = useState([])

  /**
   * Колбек, асинхронно обновляющий массив с выбранными местами.
   * @param  {array} currentPlaces - массив объектов, с выбранным местом и ценой.
   */
  const returnPlaces = (currentPlaces) => {
    setPlaces(currentPlaces)
  }

  useEffect(() => {
    setOrderParams({
      filmId: filmId,
      showDate: dateChoose,
      showTime: timeChoose,
      places: places
    })
    console.log("#############################################")
    console.log("##                                         ##")
    console.log("##              setOrderParams             ##")
    console.log("##                                         ##")
    console.log("##                                         ##")
    console.log(orderParams)
    console.log("#############################################")
  }, [dateChoose, timeChoose, places]);




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
                {dateList.map((item, index) => chooseItem(item, type = 'date', index))}
              </ScrollView>
            </View>

            <View style={styles.сhooseWrapper}>
              <Text style={styles.сhooseTitle}>Время показа</Text>
              <ScrollView style={styles.dateList} horizontal={true}>
                {timeList.map((item, index) => chooseItem(item, type = 'time', index))}
              </ScrollView>
            </View>
          </View>

          <Separator></Separator>

          {/* использую подъём состояния */}
          <ScrollView style={styles.hallContainer}>
            <HallLayout style={styles.container1} returnPlaces={returnPlaces}></HallLayout>
          </ScrollView>
          <View style={styles.orderInfoGroup}>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoTitle}>Дата:</Text>
              <Text style={styles.orderInfoText}>{orderParams.showDate}</Text>
            </View>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoTitle}>Время:</Text>
              <Text style={styles.orderInfoText}>{orderParams.showTime}</Text>
            </View>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoTitle}>Место:</Text>
              {/* при выводе выбранных мест, их номер увеличивается на единицу. И увеличивается здесь, а не в передаваемых и данных. */}
              <View >{orderParams.places.map((place, index) => <Text style={styles.orderInfoText} key={index} >{`Ряд: ${place.y+1} Место: ${place.x+1}`}</Text>)}</View>
            </View>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoTitle}>Стоимость:</Text>
              <Text style={styles.orderInfoText}>
                {orderParams.places.length >= 1 && orderParams.places
                  .map(place => place.cost)
                  .reduce((sum, current) => current + sum)
                } Руб
              </Text>
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
    marginTop: 15,
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



  /* //////////////////// orderInfoGroup /////////////////////// */

  hallContainer: {
    width: '100%',
    marginTop: 20
  },
  orderInfoGroup: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10,
    width: '100%',
  },
  orderInfoItem: {
  },
  orderInfoTitle: {
    color: '#999',
    fontSize: 12
  },
  orderInfoText: {

    color: '#fff',
    fontSize: 14
  },







  formButtonWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 10,
  },
})

export default TicketOrderScreen
