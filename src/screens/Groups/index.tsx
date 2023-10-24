import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import Button from '../../components/Button';
import GroupCard from '../../components/GroupCard';
import Header from '../../components/Header';
import Highlight from '../../components/Highlight';
import ListEmpty from '../../components/ListEmpty';
import {groupsGetAll} from '../../Storage/Group/groupsGetAll';

import * as S from './styles';

const Groups: React.FC = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState<string[]>([]);

  const handleNewGroup = () => {
    navigation.navigate('new');
  };

  const fetchGroups = async () => {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      throw error;
    }
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', {group: group});
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, []),
  );

  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </S.Container>
  );
};

export default Groups;
