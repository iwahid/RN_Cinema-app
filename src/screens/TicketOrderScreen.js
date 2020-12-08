import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button } from 'react-native'
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



  const placeRoomRender = () => {

    /* карта зала */
    let array = [
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1]
    ]
    /* карта мест для бронирования
    0 - проход
    1 - свободно
    2 - забранировано
    3 - выбрано
     */
    let [array2, updateArray2] = useState(
      [
        [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 0, 2, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 2, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 2, 2, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 2, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1]
      ]
    )

    /* объект со значением выбранного места */
    let [choosePlace, setChoosePlace] = useState([{ x: 0, y: 0 }])

    /* функция выбора места, на сформированном зале */
    const setPlaceHandler = (place) => {
      console.log("Выбрано место ", place)
      let indexFindPlace = null

      /* функция определения того, выбрано ли место повторно */
      const findPlace = choosePlace.find((item, index) => {
        if (item.x == place.x && item.y == place.y) {
          indexFindPlace = index
          return true
        }
      })

      /* При первичном выборе - добавить в массив выбранных мест, и обновлять цвета. При повторном нажатии - удалить выбор из массива выбранных мест и обновить цвета */
      if (findPlace) {
        console.log("Выбрано повторно")
        updateArray2(prev => [...prev, prev[place.y][place.x] = 1])
        setChoosePlace((prev) => {
          let temp = [...prev]
          temp.splice(indexFindPlace, 1)
          return temp
        })
      } else if (array2[place.y][place.x] !== 2) {
        setChoosePlace((prev) => [...prev, place])
        console.log("Выбрано впервые", choosePlace)
        updateArray2(prev => [...prev, prev[place.y][place.x] = 3])
      }
    }


    /* рендер карты зала */
    let result = []
    for (let i = 0; i < array.length; i++) {

      let subArray = array[i] /* "ряд" для разбора */
      let subResult = [] /* формирование "ряда" */

      for (let j = 0; j < subArray.length; j++) {
        if (subArray[j] == 1)
          subResult.push(
            <TouchableOpacity
              style={array2[i][j] == 1 ? styles.place : array2[i][j] == 2 ? styles.bookedPlace : styles.choosePlace}
              onPress={() => setPlaceHandler({ x: j, y: i })}
            ></TouchableOpacity>
          )

        if (subArray[j] == 0) /* формирование "проходов" в карте зала */
          subResult.push(<TouchableOpacity style={styles.hallway}></TouchableOpacity>)
      }
      /* формирование целого рядя в общей схеме*/
      result.push(<View style={styles.row}>{subResult.map(item => item)}</View>)
    }

    /* за этот фрагмент, тоже следовало бы четвертовать */
    /* формирование всей схемы из отдельных рядов */
    const hallScheme = <View style={styles.hallContainer}>{result.map(item => item)}</View>
    return hallScheme /* FIXME: просто добавить стили View и onPress к кнопкам */
  }

  let temp = placeRoomRender()

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

          <View>
            {/*     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(item => <TouchableOpacity style={styles.bg}></TouchableOpacity>) 
            {'123'} */}
            {temp}
          </View>
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



  /* ////////////////// hall place ///////////// */
  place: {
    width: 18,
    height: 16,
    margin: 6,
    backgroundColor: '#2F2F3B',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  hallway: {
    width: 18,
    height: 16,
    margin: 6,
    backgroundColor: THEME.BACKGROUND_COLOR
  },
  hallContainer: {
    alignContent: 'center',
    alignItems: 'center'
  },
  choosePlace: {
    width: 18,
    height: 16,
    margin: 6,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: THEME.ACCENT_COLOR,
  },
  bookedPlace: {
    width: 18,
    height: 16,
    margin: 6,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: '#9DA2B6',
  },
  /* 
  #F85661 выбранный
  9DA2B6 не доступно
  2F2F3B доступно */
  row: {
    flexDirection: 'row'
  },








  formButtonWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 10,
  },
})

export default TicketOrderScreen
