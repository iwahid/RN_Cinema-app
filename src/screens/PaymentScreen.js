import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

function AboutScreen(props) {
  return (
    <View >
      <Text>
        About Screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AboutScreen
