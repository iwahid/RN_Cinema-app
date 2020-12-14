import React from 'react';
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme';
import { View, StyleSheet } from 'react-native';
import CustomText from './CustomText';

/**
 * Компонент, отображающий рейтинг фильма в виде нескольких звёзд и их числового представления.
 * @param  {number} rating - Рейтинг, на основе которого будет выстроен компонент
 * @return {View} Компонент.
 */
const Rating = ({ rating }) => {
  let whole = Math.trunc(rating / 2)
  let fractional = (rating % 2) > 0 ? true : false

  let result = []
  for (let i = 0; i < whole; i++) {
    result.push(<Entypo name="star" size={18} color={THEME.ACCENT_COLOR} key={i} />)
  }

  fractional ? result.push(<Entypo name="star-outlined" size={18} color={THEME.ACCENT_COLOR} key={10} />) : null
  return (
    <View style={styles.spec}>{result}
      <CustomText type='description'>{'   IMDB: ' + rating}</CustomText>
    </View>);
}

const styles = StyleSheet.create({
  spec: {
    flexDirection: 'row',
    width: '100%'
  }
})

export default Rating;