import { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import { Loading } from '@/components/Loading'
import { QuizHeader } from '@/components/QuizHeader'

import { quiz as quizData } from '@/data/quiz'
import { styles } from './styles'

type QuizProps = (typeof quizData)[0]

export default function Quiz() {
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps)
  const [isQuizLoading, setIsQuizLoading] = useState(true)

  const { id } = useLocalSearchParams()

  useEffect(() => {
    const currentQuiz = quizData.find((item) => item.id === id)

    if (currentQuiz) {
      setQuiz(currentQuiz)
      setIsQuizLoading(false)
    }
  }, [id])

  if (isQuizLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
      >
        <QuizHeader
          title={quiz.title}
          currentQuestion={1}
          totalOfQuestions={4}
        />
      </ScrollView>
    </View>
  )
}
