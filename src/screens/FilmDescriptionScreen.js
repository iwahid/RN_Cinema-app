import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function FilmDescription(props) {
  return (
    <View >
      <Text>
        Create Screen
      </Text>
    </View>
  )
}

/* Добавить контейнер под изображение, сделать его фоном, и поверх наложить ещё один фон с тенью, а поверх уже название и прочее */
/* 
<ImageBackground source={{ uri: "https://reactjs.org/logo-og.png" }} style={
              {
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center"
              }
            }>
            
</ImageBackground>
            
            
            */


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FilmDescription
