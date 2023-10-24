import React from 'react';

import * as S from './styles';

interface HightlightProps {
  title: string;
  subtitle: string;
}

const Highlight: React.FC<HightlightProps> = ({title, subtitle}) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Container>
  );
};

export default Highlight;
