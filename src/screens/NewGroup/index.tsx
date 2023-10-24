import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Highlight from '../../components/Highlight';
import Input from '../../components/Input';

import * as S from './styles';
import {groupCreate} from '../../Storage/Group/groupCreate';
import {AppError} from '../../utils/AppError';
import {Alert} from 'react-native';

const NewGroup: React.FC = () => {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma');
      }

      await groupCreate(group);
      navigation.navigate('players', {group});
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Nao foi possivel criar um novo grupo');
      }
      throw error;
    }
  };

  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button style={{marginTop: 20}} title="Criar" onPress={handleNew} />
      </S.Content>
    </S.Container>
  );
};

export default NewGroup;
