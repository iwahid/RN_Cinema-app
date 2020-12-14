import React from 'react';
import {Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import { THEME } from '../../theme';

/**
 * Компонент - кастомная кнопка.
 * @param  {string} props.children - дочерним элементом передаётся title кнопки
 * @return {TouchableOpacity} Компонент.
 */
const FormButton = (props) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: 50,
    backgroundColor: THEME.ACCENT_COLOR,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    elevation: 9
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#ffffff',
  },
});