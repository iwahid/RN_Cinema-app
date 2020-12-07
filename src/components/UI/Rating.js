import React from 'react';
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme';

const Rating = ({ rating }) => {
  let whole = Math.trunc(rating / 2)
  let fractional = (rating % 2) > 0 ? true : false

  /* FIXME: заменить цвет на общее значение */
  let result = []
  for (let i = 0; i < whole; i++) {
    result.push(<Entypo name="star" size={18} color={THEME.ACCENT_COLOR} key={i} />)
  }
  
  fractional ? result.push(<Entypo name="star-outlined" size={18} color={THEME.ACCENT_COLOR} key={10}/>) : null
  return (result);
}

export default Rating;