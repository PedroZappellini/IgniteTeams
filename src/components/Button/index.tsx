import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import * as S from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: S.ButtonTypeStyleProps;
};

const Button: React.FC<ButtonProps> = ({title, type = 'PRIMARY', ...rest}) => {
  return (
    <S.Container type={type} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default Button;
