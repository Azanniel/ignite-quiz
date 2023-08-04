import { useEffect, useState, useRef } from 'react'
import { Alert, ScrollView, Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { HouseLine, Trash } from 'phosphor-react-native'
import { Swipeable } from 'react-native-gesture-handler'
import Animated, {
  Layout,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated'

import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { HistoryCard } from '@/components/HistoryCard'

import { HistoryDTO } from '@/storage/dtos/history'
import { fetchQuizHistory } from '@/storage/actions/fetch-quiz-history'
import { deleteQuizHistory } from '@/storage/actions/delete-quiz-history'

import { theme } from '@/styles/theme'
import { styles } from './styles'

export default function History() {
  const [isHistoryFetching, setIsHistoryFetching] = useState(true)
  const [history, setHistory] = useState<HistoryDTO[]>([])

  const swipeableRefs = useRef<Swipeable[]>([])

  async function fetchHistory() {
    const quizHistory = await fetchQuizHistory()
    setHistory(quizHistory)
    setIsHistoryFetching(false)
  }

  async function removeHistory(id: string) {
    await deleteQuizHistory(id)

    fetchHistory()
  }

  function handleRemove(id: string, index: number) {
    swipeableRefs.current[index].close()

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
        {history.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              entering={SlideInRight.delay(index * 50)}
              exiting={SlideOutRight.duration(400)}
              layout={Layout.springify()}
            >
              <Swipeable
                ref={(ref) => {
                  if (ref) {
                    swipeableRefs.current.push(ref)
                  }
                }}
                overshootLeft={false}
                containerStyle={styles.swipeableContainer}
                renderLeftActions={() => {
                  return (
                    <Pressable
                      style={styles.swipeableRemove}
                      onPress={() => handleRemove(item.id, index)}
                    >
                      <Trash size={32} color={theme.colors.gray_100} />
                    </Pressable>
                  )
                }}
              >
                <HistoryCard data={item} />
              </Swipeable>
            </Animated.View>
          )
        })}
      </ScrollView>
    </View>
  )
}
