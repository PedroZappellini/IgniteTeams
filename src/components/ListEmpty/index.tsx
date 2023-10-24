import React from 'react';
import {View} from 'react-native';

import * as S from './styles';

interface ListEmptyProps {
  message: string;
}

const ListEmpty: React.FC<ListEmptyProps> = ({message}) => {
  return (
    <S.Container>
      <S.Message>{message}</S.Message>
    </S.Container>
  );
};

export default ListEmpty;
