import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * Компонент Текст
 * @param {String} type - тип содержимого (h1, h2, h3, h4, regular, description, label)
 * @param {String} children - содержимое текстового поля
 * 
 *  */
const CustomText = (props) => {
  return (
    <Text style={styles[props.type]}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({

  h1: {
    /* заголовок */
    color: '#fff',
    fontSize: 30,
    fontWeight: "600",
  },
  h2: {
    /* заголовок */
    color: '#fff',
    fontSize: 24,
    fontWeight: "400",
  },
  h3: {
    /* заголовок */
    color: '#fff',
    fontSize: 20,
    fontWeight: "400",
  },
  h4: {
    /* заголовок */
    color: '#fff',
    fontSize: 18,
    fontWeight: "400",
  },
  regular: {
    /* заголовок */
    color: '#fff',
    fontSize: 18,
    fontWeight: "400",
  },
  description: {
    /* Маленький текст */
    color: '#fff',
    fontSize: 14,
  },
  label: {
    /* Маленький поясняющий текст */
    color: '#999',
    fontSize: 12,
  },
});

export default CustomText;