import AsyncStorage from '@react-native-async-storage/async-storage'

import { HISTORY_COLLECTION } from '../storage-config'
import { HistoryDTO } from '../dtos/history'

export async function fetchQuizHistory() {
  const storage = await AsyncStorage.getItem(HISTORY_COLLECTION)
  const history: HistoryDTO[] = storage ? JSON.parse(storage) : []

  return history
}
