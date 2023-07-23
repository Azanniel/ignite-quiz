import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { router } from 'expo-router'
import { Trophy } from 'phosphor-react-native'

import { Header } from '@/components/Header'
import { Level } from '@/components/Level'
import { QuizCard } from '@/components/QuizCard'

import { quizzes as quizzesData } from '@/data/quizzes'

import { styles } from './styles'

export default function Home() {
  const [quizzes, setQuizzes] = useState(quizzesData)
  const [levels, setLevels] = useState([1, 2, 3])

  function handleLevelFilter(level: number) {
    const levelAlreadySelected = levels.includes(level)

    if (levelAlreadySelected) {
      if (levels.length > 1) {
        setLevels((prevState) => prevState.filter((item) => item !== level))
      }
    } else {
      setLevels((prevState) => [...prevState, level])
    }
  }

  useEffect(() => {
    setQuizzes(quizzesData.filter((quiz) => levels.includes(quiz.level)))
  }, [levels])

  return (
    <View style={styles.container}>
      <Header
        icon={Trophy}
        title="Vamos estudar"
        subtitle={`Complete os desafios e avance${'\n'} em conhecimento`}
      />

      <View style={styles.levels}>
        <Level
          title="Fácil"
          type="EASY"
          onPress={() => handleLevelFilter(1)}
          isChecked={levels.includes(1)}
        />

        <Level
          title="Médio"
          type="MEDIUM"
          onPress={() => handleLevelFilter(2)}
          isChecked={levels.includes(2)}
        />

        <Level
          title="Difícil"
          type="HARD"
          onPress={() => handleLevelFilter(3)}
          isChecked={levels.includes(3)}
        />
      </View>

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuizCard
            quiz={item}
            onPress={() =>
              router.push({
                pathname: '/quiz/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cards}
      />
    </View>
  )
}
