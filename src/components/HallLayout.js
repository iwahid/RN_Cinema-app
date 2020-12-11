import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { THEME } from '../theme'

/**
 * Компонент, позволяющий выбрать место в зрительном зале.
 * @param  {number} hallMap - "Карта", схема зала.
 * @param  {number} choosePlaceMap - "Карта", схема доступных мест в зале.
 * @param  {function} returnPlaces - Колбек, асинхронно возвращающий массив со значениями выбранных пользователем мест в зале.
 * @return {View} Компонент.
 */
function HallLayout(props) {


  const placeRoomRender = () => {

    /* карта зала */
    let hallMap = [
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
    let [choosePlaceMap, updateChoosePlaceMap] = useState(
      [
        [{ status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }],
        [{ status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }],
        [{ status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }],
        [{ status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 2, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }],
        [{ status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }],
        [{ status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }, { status: 0, cost: 0 }], /* ряд */
        [{ status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }],
        [{ status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 2, cost: 0 }, { status: 2, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }],
        [{ status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }],
        [{ status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 0, cost: 0 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }, { status: 1, cost: 250 }]
      ]
    )

    /* массив с объектами-значениями выбранного места */
    let [choosePlaces, setChoosePlaces] = useState([]) /* { x: Number, y: Number, cost: Number} */

    /* хук, асинхронно возвращающий данные о выбранных пользователем местах */
    useEffect(() => {
      props.returnPlaces(choosePlaces)
    }, [choosePlaces]);



    /* функция выбора места, на сформированном зале */
    const setPlaceHandler = (place) => {
      console.log("Выбрано место ", place)
      let indexFindPlace = null

      /* функция определения того, выбрано ли место повторно */
      const findPlace = choosePlaces.find((item, index) => {
        if (item.x == place.x && item.y == place.y) {
          indexFindPlace = index
          return true
        }
      })

      /* При первичном выборе - добавить в массив выбранных мест, и обновлять цвета. При повторном нажатии - удалить выбор из массива выбранных мест и обновить цвета */
      if (findPlace) {
        console.log("Выбрано повторно")
        updateChoosePlaceMap(prev => [...prev, prev[place.y][place.x].status = 1]) /* обновляю карту выбранных мест, не изменяя стоимость */
        setChoosePlaces((prev) => {
          let temp = [...prev]
          temp.splice(indexFindPlace, 1)
          return temp
        })
      } else if (choosePlaceMap[place.y][place.x].status !== 2) {
        console.log(`Выбрано впервые, `, place, `цена: ${place.cost} `)
        setChoosePlaces(prev => [...prev, place])
        updateChoosePlaceMap(prev => [...prev, prev[place.y][place.x].status = 3])
      }

      console.log("Выбрано: ", choosePlaces.length, " мест, стоимостями: ", choosePlaces.map(item => item.cost))
    }


    /* рендер карты зала */
    let result = []
    for (let i = 0; i < hallMap.length; i++) {

      let subArray = hallMap[i] /* "ряд" для разбора */
      let subResult = [] /* формирование "ряда" */

      for (let j = 0; j < subArray.length; j++) {
        if (subArray[j] == 1)
          subResult.push(
            <TouchableOpacity
              key={i + '' + j}
              style={choosePlaceMap[i][j].status == 1 ? styles.place : choosePlaceMap[i][j].status == 2 ? styles.bookedPlace : styles.choosePlaces}
              onPress={() => setPlaceHandler({ x: j, y: i, cost: choosePlaceMap[i][j].cost })} /* тащу цену отсюда, что бы лишний раз не искать её при подсчёте цены*/
            ></TouchableOpacity>
          )

        if (subArray[j] == 0) /* формирование "проходов" в карте зала */
          subResult.push(<TouchableOpacity style={styles.hallway}></TouchableOpacity>)
      }
      /* формирование целого рядя в общей схеме*/
      result.push(<View key={i} style={styles.row}>{subResult.map(item => item)}</View>)
    }

    /* за этот фрагмент, тоже следовало бы четвертовать */
    /* формирование всей схемы из отдельных рядов */
    const hallScheme = <View style={styles.hallContainer}>{result.map(item => item)}</View>
    return hallScheme /* FIXME: просто добавить стили View и onPress к кнопкам */
  }

  let temp = placeRoomRender()

  return (
    <View style={styles.container}>
      <View style={styles.placeDescription}>
        <View style={styles.placeDescriptionItem}>
          <View style={styles.place}></View>
          <Text style={styles.placeDescriptionTitle}>Доступно</Text>
        </View>
        <View style={styles.placeDescriptionItem}>
          <View style={styles.bookedPlace}></View>
          <Text style={styles.placeDescriptionTitle}>Занято</Text>
        </View>
        <View style={styles.placeDescriptionItem}>
          <View style={styles.choosePlaces}></View>
          <Text style={styles.placeDescriptionTitle}>Выбрано</Text>
        </View>
      </View>
      <Image source={require('./../../assets/Screen.png')} style={styles.screenImg} />

      <View >
        {temp}
      </View>
    </View>

  )
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: "center",
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
  choosePlaces: {
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
  placeDescription: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25

  },
  placeDescriptionItem: {
    alignItems: 'center',
  },
  screenImg: {
    height: 30,
    width: '100%',
    marginBottom: 40
  },
  placeDescriptionTitle: {
    
    color: '#999',
    fontSize: 12
  }


})

export default HallLayout
