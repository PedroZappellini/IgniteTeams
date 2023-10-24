import AsyncStorage from '@react-native-async-storage/async-storage';
import {PLAYER_COLLECTION} from '../storageConfig';
import {PlayerStorageDTO} from './PlayerStorageDTO';

export const playersGetByGroup = async (group: string) => {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
  } catch (error) {
    throw error;
  }
};
