import React from 'react'
import { View, Text, StyleSheet, Button, FlatList, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { DATA } from '../data'
import { Post } from '../components/Post'

function BookedScreen({ navigation }) {

  /* колбек передаваемый в каждый из айтемов, который сработает и переведёт на нужную страницу, при нажатии на карточку.
  Навигация через экраны и через кнопки делается по разному, потому что Навигатор по дефолту передаёт в экраны собственное свойство navigation - ссылка на метод изменения стека навигации.
  В дочерние компоненты так же требуется прокидывать этот метод. Либо напрямую, либо, либо как обычно для реакта - через колбек */
  function openPostHandler(post) {
    navigation.navigate('Post', { postId: post.id })
  }

  return (
    <View style={styles.wrapper}>

      <Text>BookedScreen</Text>

      {/* Обновление данных в header из текущего окна */}
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({
          title: 'Updated!',
          headerTintColor: '#000000',
          headerRight: () => (
            <HeaderButtons
              HeaderButtonComponent={AppHeaderIcon}>
              <Item title='Take photo' iconName='ios-camera' onPress={console.log('Press photo')}></Item>

            </HeaderButtons>
          ),
          headerLeft: () => (/* здесь была переопределена кнопка назад. Точнее, она была заменена кнопкой открытия меню */
            <HeaderButtons
              HeaderButtonComponent={AppHeaderIcon}>
              <Item title='Toggle Drawer' iconName='ios-menu' onPress={console.log('Toggle menu')}></Item>

            </HeaderButtons>
          )
        })}
      />
      <FlatList
        data={DATA.filter( post => post.booked)}
        keyExtractor={post => post.id.toString()}
        /* в компонент передавать данные - нормально. Не нормально передавать их в навигации */
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler}></Post>}
      ></FlatList>



      {/* Переход в новый компонент, с передачей в него дополнительных параметров */}
      <Button
        title="Go to Next Screen"
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        })}
      />
      

    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
})

export default BookedScreen
