import React from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';
import ButtonIcon from '../ButtonIcon';

import * as S from './styles';

type Props = {
  name: string;
  onRemove: () => void;
};

const PlayerCard: React.FC<Props> = ({name, onRemove}) => {
  return (
    <S.Container>
      <MaterialIcons
        style={{marginLeft: 16, marginRight: 4}}
        name="person"
        color={theme.COLORS.GRAY_200}
        size={24}
      />
      <S.Name>{name}</S.Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </S.Container>
  );
};

export default PlayerCard;
