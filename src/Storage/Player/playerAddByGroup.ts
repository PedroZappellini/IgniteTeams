import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppError} from '../../utils/AppError';
import {PLAYER_COLLECTION} from '../storageConfig';
import {PlayerStorageDTO} from '../Player/PlayerStorageDTO';
import {playersGetByGroup} from './playersGetByGroup';

export const playerAddByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string,
) => {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playeAlreadyExists = storedPlayers.filter(
      player => player.name === newPlayer.name,
    );

    if (playeAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa ja foi adicionada a este time');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
};
