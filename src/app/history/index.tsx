import { useEffect, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import { HouseLine } from 'phosphor-react-native'

import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { HistoryCard } from '@/components/HistoryCard'

import { fetchQuizHistory } from '@/storage/actions/fetch-quiz-history'
import { HistoryDTO } from '@/storage/dtos/history'

import { styles } from './styles'
import { deleteQuizHistory } from '@/storage/actions/delete-quiz-history'

export default function History() {
  const [isHistoryFetching, setIsHistoryFetching] = useState(true)
  const [history, setHistory] = useState<HistoryDTO[]>([])

  async function fetchHistory() {
    const quizHistory = await fetchQuizHistory()
    setHistory(quizHistory)
    setIsHistoryFetching(false)
  }

  async function removeHistory(id: string) {
    setIsHistoryFetching(true)

    await deleteQuizHistory(id)

    fetchHistory()
  }

  function handleRemove(id: string) {
    Alert.alert('Remover', 'Deseja remover esse registro?', [
      {
        text: 'Sim',
        onPress: () => removeHistory(id),
      },
      { text: 'Não', style: 'cancel' },
    ])
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  if (isHistoryFetching) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${'\n'}realizados`}
        icon={HouseLine}
        onPress={router.back}
      />

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {history.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.6}
            onPress={() => handleRemove(item.id)}
          >
            <HistoryCard data={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
