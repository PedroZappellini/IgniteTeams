import React from 'react';
import {View} from 'react-native';

import * as S from './styles';

const Loading: React.FC = () => {
  return (
    <S.Container>
      <S.LoadingIndicator />
    </S.Container>
  );
};

export default Loading;
