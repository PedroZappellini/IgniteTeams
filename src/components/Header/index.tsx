import {useNavigation} from '@react-navigation/native';
import React from 'react';
import logoImg from '../../assets/logo.png';
import * as S from './styles';

interface HeaderProps {
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({showBackButton}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('groups');
  };

  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton onPress={handleGoBack}>
          <S.BackIcon />
        </S.BackButton>
      )}

      <S.Logo source={logoImg} />
    </S.Container>
  );
};

export default Header;
