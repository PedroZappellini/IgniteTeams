import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import * as S from './styles';

type Props = TouchableOpacityProps &
  S.FilterStyleProps & {
    title: string;
  };

const Filter: React.FC<Props> = ({title, isActive = false, ...rest}) => {
  return (
    <S.Container isActive={isActive} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default Filter;
