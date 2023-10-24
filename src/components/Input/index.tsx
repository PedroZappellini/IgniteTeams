import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {useTheme} from 'styled-components';

import * as S from './styles';

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>;
}

const Input: React.FC<InputProps> = ({inputRef, ...rest}) => {
  const {COLORS} = useTheme();

  return (
    <S.Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
};

export default Input;
