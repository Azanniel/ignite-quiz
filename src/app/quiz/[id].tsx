import { useState, useEffect } from 'react'
import { View, Alert, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
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
import { ProgressBar } from '@/components/ProgressBar'
import { OverlayFeedback, overlayColorType } from '@/components/OverlayFeedback'

import { quiz as quizData } from '@/data/quiz'
import { createQuizHistory } from '@/storage/actions/create-quiz-history'

import { theme } from '@/styles/theme'
import { styles } from './styles'

type QuizProps = (typeof quizData)[0]

export default function Quiz() {
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps)
  const [statusQuizReply, setStatusQuizReply] =
    useState<overlayColorType>('default')
  const [isQuizLoading, setIsQuizLoading] = useState(true)
  const [points, setPoints] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(
    null,
  )

  const { id } = useLocalSearchParams()

  const shake = useSharedValue(0)
  const scrollY = useSharedValue(0)
  const cardPosition = useSharedValue(0)

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

  const fixedProgressBarStyleAnimated = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      paddingTop: 50,
      backgroundColor: theme.colors.gray_500,
      width: '110%',
      left: '-5%',
      zIndex: 1,
      opacity: interpolate(scrollY.value, [50, 90], [0, 1], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [50, 100],
            [-40, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })

  const dragCardStyleAnimated = useAnimatedStyle(() => {
    const cardInclination = 10
    const rotateZ = cardPosition.value / cardInclination

    return {
      transform: [
        { translateX: cardPosition.value },
        { rotateZ: `${rotateZ}deg` },
      ],
    }
  })

  const quizHeaderStyleAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [60, 90], [1, 0], Extrapolate.CLAMP),
    }
  })

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  const onPan = Gesture.Pan()
    .activateAfterLongPress(200)
    .onUpdate((event) => {
      const moveToLeft = event.translationX < 0

      if (moveToLeft) {
        cardPosition.value = event.translationX
      }
    })
    .onEnd((event) => {
      const areaToSkip = -200

      if (event.translationX < areaToSkip) {
        runOnJS(handleSkipConfirm)()
      }

      cardPosition.value = withTiming(0)
    })

  async function playSound(isCorrect: boolean) {
    const file = isCorrect
      ? require('../../assets/correct.mp3')
      : require('../../assets/wrong.mp3')

    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true })

    await sound.setPositionAsync(0)
    await sound.playAsync()
  }

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

      playSound(true)

      setStatusQuizReply('success')
      handleNextQuestion()
    } else {
      playSound(false)
      setStatusQuizReply('error')
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

  async function shakeAnimation() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)

    shake.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0, undefined, (finished) => {
        'worklet'
        if (finished) {
          runOnJS(handleNextQuestion)()
        }
      }),
    )
  }

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
      <OverlayFeedback variant={statusQuizReply} />

      <Animated.View style={fixedProgressBarStyleAnimated}>
        <Text style={styles.title}>{quiz.title}</Text>

        <ProgressBar
          current={currentQuestion + 1}
          total={quiz.questions.length}
        />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.question}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.header, quizHeaderStyleAnimated]}>
          <QuizHeader
            title={quiz.title}
            currentQuestion={currentQuestion + 1}
            totalOfQuestions={quiz.questions.length}
          />
        </Animated.View>

        <GestureDetector gesture={onPan}>
          <Animated.View style={[shakeStyleAnimated, dragCardStyleAnimated]}>
            <Question
              key={quiz.questions[currentQuestion].title}
              question={quiz.questions[currentQuestion]}
              alternativeSelected={alternativeSelected}
              setAlternativeSelected={setAlternativeSelected}
              onUnmount={() => setStatusQuizReply('default')}
            />
          </Animated.View>
        </GestureDetector>

        <View style={styles.footer}>
          <OutlineButton title="Parar" onPress={handleStop} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </Animated.ScrollView>
    </View>
  )
}
