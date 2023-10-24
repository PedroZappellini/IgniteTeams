import React, {useEffect, useState, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, TextInput} from 'react-native';
import Button from '../../components/Button';
import ButtonIcon from '../../components/ButtonIcon';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import Highlight from '../../components/Highlight';
import Input from '../../components/Input';
import ListEmpty from '../../components/ListEmpty';
import PlayerCard from '../../components/PlayerCard';

import * as S from './styles';
import {Alert} from 'react-native';
import {AppError} from '../../utils/AppError';
import {playerAddByGroup} from '../../Storage/Player/playerAddByGroup';
import {playersGetByGroup} from '../../Storage/Player/playersGetByGroup';
import {playersGetByGroupAndTeam} from '../../Storage/Player/playersGetByGroupAndTeam';
import {PlayerStorageDTO} from '../../Storage/Player/PlayerStorageDTO';
import {playerRemoveByGroup} from '../../Storage/Player/playerRemoveByGroup';
import {groupRemoveByName} from '../../Storage/Group/groupRemoveByName';

type RouteParams = {
  group: string;
};

const Players: React.FC = () => {
  const navigation = useNavigation();
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const route = useRoute();
  const {group} = route.params as RouteParams;

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar',
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        Alert.alert('Nova pessoa', 'Nao foi possivel adicionar');
      }
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert(
        'Pessoas',
        'Nao foi possivel carregar as pessoas do time selecionado',
      );
    }
  };

  const handlePlayerRemove = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover pessoa', 'Nao foi possivel remover essa pessoa');
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      Alert.alert('Remover grupo', 'Nao foi possivel remover o grupo');
    }
  };

  const handleRemoveGroup = async () => {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      {text: 'Nao', style: 'cancel'},
      {text: 'Sim', onPress: () => groupRemove()},
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </S.Form>
      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({item}) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <S.NumbersOfPlayers>{players.length}</S.NumbersOfPlayers>
      </S.HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1},
        ]}
        renderItem={({item}) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Nao ha pessoas nesse time" />
        )}
      />
      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </S.Container>
  );
};

export default Players;
