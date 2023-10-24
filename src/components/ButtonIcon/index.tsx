import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  type?: S.ButtonIconTypeStyleProps;
  icon: string;
};

const ButtonIcon: React.FC<Props> = ({icon, type = 'PRIMARY', ...rest}) => {
  return (
    <S.Container {...rest}>
      <MaterialIcons
        name={icon}
        color={type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED}
        size={24}
      />
    </S.Container>
  );
};

export default ButtonIcon;
