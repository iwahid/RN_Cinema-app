import React from 'react'
import {View} from 'react-native'

/**
 * Компонент, предназначенный для визуального разграничения зон и областей на экране. Представляет собой простую разделительную линию
 * @return {View} Компонент.
 */
function Separator() {
  return (
  <View style={{borderBottomColor: '#fff', opacity: 0.2, borderBottomWidth: 1, width: '100%', paddingHorizontal: 0}}>
  </View>
  )
}

export default Separator
