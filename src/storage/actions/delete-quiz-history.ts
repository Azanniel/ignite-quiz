import AsyncStorage from '@react-native-async-storage/async-storage'

import { fetchQuizHistory } from './fetch-quiz-history'
import { HISTORY_COLLECTION } from '../storage-config'

export async function deleteQuizHistory(quizHistoryId: string) {
  const currentHistory = await fetchQuizHistory()

  const historyWithoutOne = currentHistory.filter(
    (history) => history.id !== quizHistoryId,
  )

  const storage = JSON.stringify(historyWithoutOne)

  await AsyncStorage.setItem(HISTORY_COLLECTION, storage)
}
