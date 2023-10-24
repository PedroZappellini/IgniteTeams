import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import * as S from './styles';

interface GroupCardProps extends TouchableOpacityProps {
  title: string;
}

const GroupCard: React.FC<GroupCardProps> = ({title, ...rest}) => {
  return (
    <S.Container {...rest}>
      <S.Icon />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default GroupCard;
