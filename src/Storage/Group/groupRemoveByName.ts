import AsyncStorage from '@react-native-async-storage/async-storage';
import {GROUP_COLLECTION, PLAYER_COLLECTION} from '../storageConfig';
import {groupsGetAll} from './groupsGetAll';

export const groupRemoveByName = async (groupDeleted: string) => {
  try {
    const storedGroups = await groupsGetAll();
    const groups = storedGroups.filter(group => group !== groupDeleted);

    const newGroups = JSON.stringify(groups);

    await AsyncStorage.setItem(GROUP_COLLECTION, newGroups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
};
