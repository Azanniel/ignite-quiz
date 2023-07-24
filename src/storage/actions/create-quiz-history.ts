import AsyncStorage from '@react-native-async-storage/async-storage'

import { HistoryDTO } from '../dtos/history'
import { fetchQuizHistory } from './fetch-quiz-history'
import { HISTORY_COLLECTION } from '../storage-config'

export async function createQuizHistory(quizHistory: HistoryDTO) {
  const currentHistory = await fetchQuizHistory()
  const storage = JSON.stringify([...currentHistory, quizHistory])

  await AsyncStorage.setItem(HISTORY_COLLECTION, storage)
}
