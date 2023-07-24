import { View, Text } from 'react-native'

import { Option } from '../Option'
import { styles } from './styles'

interface Question {
  title: string
  alternatives: string[]
}

interface QuestionProps {
  question: Question
  alternativeSelected?: number | null
  setAlternativeSelected?: (value: number) => void
}

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </View>
  )
}
