import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

import { DATA } from '../data'
import { THEME } from '../theme'

const PostScreen = ({ route, navigation }) => {
  const postId = route.params.postId
  /* Либо  navigation.getparam('postId') */

  const post = DATA.find(post => post.id === postId)
  const iconName = post.booked ? 'ios-star' : 'ios-star-outline'

    useEffect(() => {

      navigation.setOptions({
        title: 'Updated!',
        headerTintColor: '#000000',
        headerRight: () => (
          <HeaderButtons
            HeaderButtonComponent={AppHeaderIcon}>
            <Item title='Booked' iconName={iconName} onPress={() => console.log('Post added to booked')}></Item>

          </HeaderButtons>
        ),
      })

    }, []);

  const removeHandler = () => {


    Alert.alert(
      "Удалить пост",
      "Вы действительно хотите удалить пост?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Удаление поста отменено"),
          style: "cancel"
        },
        {
          text: "Удалить",
          onPress: () => console.log("Пост удалён"),
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  }
  return (
    <ScrollView >
      <Image source={{ uri: post.img }} style={styles.img}></Image>

      <View style={styles.textWrap}>
        <Text style={styles.title}>
          {post.text.repeat(200)}
        </Text>
      </View>
      <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler}>

      </Button>
    </ScrollView>
  )
}

PostScreen.navigationOptions

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10,
  },
  title: {
    /* FIXME: добавить шрифты */
  }
})

export default PostScreen
