import React, { useState, useEffect } from 'react'

/* скачивание списка фильмов с firebase */


export const getFilmsList = () => {

  const DATA = {
    popularList: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
        title: 'Семейка бигфутов',
        rating: '7.9',
        img: 'https://kinohod.ru/o/5e/5b/5e5b3a52-13b5-48b4-9e21-833ba207c8ee.jpg',
        description: 'Все семьи разные, но эта – самая разношерстная. Папа когда-то превратился в Бигфута, сын унаследовал его суперспособности и умение понимать язык животных, так еще и в доме вместе с ними и мамой живет целый зоопарк – огромный медведь, неутомимая белка и беспокойный енот со множеством очаровательных детенышей. Когда же уникальному заповеднику на Аляске понадобится помощь, вся семейка Бигфутов отправится в большое путешествие и покажет всему миру, на что способна их команда…   Все семьи разные, но эта – самая разношерстная. Папа когда-то превратился в Бигфута, сын унаследовал его суперспособности и умение понимать язык животных, так еще и в доме вместе с ними и мамой живет целый зоопарк – огромный медведь, неутомимая белка и беспокойный енот со множеством очаровательных детенышей. Когда же уникальному заповеднику на Аляске понадобится помощь, вся семейка Бигфутов отправится в большое путешествие и покажет всему миру, на что способна их команда…'
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
        title: 'Координаты Скайфолл',
        rating: '1.9',
        img: 'https://plaqat.ru/images/10517.jpg'
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d723',
        title: 'Спутник',
        rating: '2.9',
        img: 'https://static.mk.ru/upload/entities/2020/04/29/21/articles/detailPicture/1e/f5/01/9f/5b63adea20a506e7ffe4ebc7d750585d.jpg'
      },
    ],
    otherList: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b14',
        title: 'Выжившие',
        rating: '3.9',
        img: 'https://www.kino-teatr.ru/movie/posters/big/7/128987.jpg'
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f625',
        title: 'Подземка',
        rating: '4.9',
        img: 'https://i.pinimg.com/originals/b1/43/a7/b143a786c09b565dd615a4671cf1dec7.png'
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d736',
        title: 'Разлом',
        rating: '5.9',
        img: 'https://upload.wikimedia.org/wikipedia/ru/c/c4/%D0%A0%D0%B0%D0%B7%D0%BB%D0%BE%D0%BC_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2018%29.jpg'
      },
    ]
  }
  /* массив со всеми фильмами, которые были / будут доступны для просмотра в кинотеатре */
  const filmsIdList = {
    newList: ['435', '3498', '258687', '326', '328', '329', '448', '535341', '957887', '476'],
    popularList: ['2360', '679486', '526', '522', '342', '397667', '447301', '1143242', '370', '32898'],
    leaveList: ['389', '279102', '361', '195334', '324', '725190', '346', '325', '301', '41519'],
    soonList: ['81314', '444', '530', '586397', '430', '111543', '1108577', '381', '474', '689'],
  }





  /* загрузка расширенного списка данных по API, с использованием id полученных из firebase */
  const [fullFilmsList, setFullFilmsList] = useState([])

  const loadFullFilmList = async (firebaseFilmsIDList) => {
    /* создание объекта с данными о каждом фильме */
    function Film(id, name, url) {
      this.id = id;
      this.name = name;
      this.url = url
    }

    /* создание промежуточного объекта, мутируемого при работе метода. Создан дополнительно, что бы каждый раз не дёргать стейт */
    const tempFullFilmsList = {}

    function loadingList(filmsCategory) {
      tempFullFilmsList[filmsCategory] = []
      firebaseFilmsIDList[filmsCategory].forEach(async (filmId) => {

        let url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/${filmId}`
        let response = await fetch(url, {
          headers: {
            accept: 'application/json',
            'X-API-KEY': 'b3aed60d-270b-4a78-b0d6-81f2b08cc274'
          }
        })

        let result = await response.json()
        /* дополняю список сформированными объектами-фильмами */
        tempFullFilmsList[filmsCategory].push(
          new Film(result.data.filmId, result.data.nameRu, result.data.posterUrl)
        )

        /* console.log('-------------+++++++++++++++++++++++++++--------------', tempFullFilmsList) */
      })

      setFullFilmsList(tempFullFilmsList)
      /* console.log(')))))))))))))))))))))))))))))))))', fullFilmsList) */
    }

    Object.keys(firebaseFilmsIDList).map(filmsCategory => loadingList(filmsCategory))
  }

  /* получение данных по API только после того, как получен список id из firebase */
  useEffect(() => {
    loadFullFilmList(firebaseFilmsIDList)
  }, [firebaseFilmsIDList])
















  /* Список id фильмов, полученных из firebase. В виде объекта, разделён по категориям */
  const [firebaseFilmsIDList, setFirebaseFilmsIDList] = useState({})

  const loadFirebaseFilmsIDList = async () => {
    const response = await fetch(
      'https://rn-cinema-app-default-rtdb.firebaseio.com/data.json',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const data = await response.json()
    const films = Object.keys(data).map(key => ({ ...data[key] }))

    /* преобразую полученный ответ к удобному формату. 
    Объект, свойства которого - отдельные группы/листы фильмов*/
    setFirebaseFilmsIDList(films[0])
  }

  /* загрузка списка id-шников актуальных фильмов из firebase, при запуске приложения */
  useEffect(() => {
    loadFirebaseFilmsIDList()
  }, [])
}


/* FIXME: запись только один раз, перед релизом приложения. Просто наполнение раздела кинотеатра данными о фильмах в показе */
/*  const addData = async filmsList => {
   console.log(filmsList)
   const response = await fetch('https://rn-cinema-app-default-rtdb.firebaseio.com/data.json', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(filmsList)
   })
   const responseData = await response.json()
   console.log(responseData)
 }
 addData(filmsIdList) */

/*  "filmId",
   "nameRu",
   "nameEn",
   "webUrl",
   "posterUrl",
   "posterUrlPreview",
   "year",
   "filmLength",
   "slogan",
   "description",
   "type",
   "ratingMpaa",
   "ratingAgeLimits",
   "premiereRu",
   "distributors",
   "premiereWorld",
   "premiereDigital",
   "premiereWorldCountry",
   "premiereDvd",
   "premiereBluRay",
   "distributorRelease",
   "countries",
   "genres",
   "facts",
   "seasons", */