import { useState, useEffect } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { Loading } from '@/components/Loading'
import { QuizHeader } from '@/components/QuizHeader'
import { Question } from '@/components/Question'
import { OutlineButton } from '@/components/OutlineButton'
import { ConfirmButton } from '@/components/ConfirmButton'

import { quiz as quizData } from '@/data/quiz'
import { createQuizHistory } from '@/storage/actions/create-quiz-history'
import { styles } from './styles'

type QuizProps = (typeof quizData)[0]

export default function Quiz() {
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps)
  const [isQuizLoading, setIsQuizLoading] = useState(true)
  const [points, setPoints] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null,
  )

  const { id } = useLocalSearchParams()
  const shake = useSharedValue(0)

  const shakeStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shake.value,
            [0, 0.5, 1, 1.5, 2, 2.5, 3],
            [0, -15, 0, 15, 0, -15, 0],
          ),
        },
      ],
    }
  })

  async function handleFinished() {
    await createQuizHistory({
      id: new Date().getTime().toString(),
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length,
    })

    router.replace({
      pathname: '/finish',
      params: {
        points,
        total: quiz.questions.length,
      },
    })
  }

  function handleNextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prevState) => prevState + 1)
    } else {
      handleFinished()
    }
  }

  function handleSkipConfirm() {
    Alert.alert('Pular', 'Deseja realmente pular a questão?', [
      { text: 'Sim', onPress: () => handleNextQuestion() },
      { text: 'Não', style: 'destructive' },
    ])
  }

  async function handleConfirm() {
    if (alternativeSelected === null) {
      return handleSkipConfirm()
    }

    if (quiz.questions[currentQuestion].correct === alternativeSelected) {
      setPoints((prevState) => prevState + 1)
    } else {
      shakeAnimation()
    }

    setAlternativeSelected(null)
  }

  function handleStop() {
    Alert.alert('Parar', 'Deseja parar agora?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: router.back,
      },
    ])
  }

  function shakeAnimation() {
    shake.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0),
    )
  }

  useEffect(() => {
    const currentQuiz = quizData.find((item) => item.id === id)

    if (currentQuiz) {
      setQuiz(currentQuiz)
      setIsQuizLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (quiz.questions) {
      handleNextQuestion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points])

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
          currentQuestion={currentQuestion + 1}
          totalOfQuestions={quiz.questions.length}
        />

        <Animated.View style={[styles.content, shakeStyleAnimated]}>
          <Question
            key={quiz.questions[currentQuestion].title}
            question={quiz.questions[currentQuestion]}
            alternativeSelected={alternativeSelected}
            setAlternativeSelected={setAlternativeSelected}
          />
        </Animated.View>

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </ScrollView>
    </View>
  )
}
