import { View } from 'react-native'
import { ToggleLeft, Trophy } from 'phosphor-react-native'

import { Header } from '@/components/Header'
import { Level } from '@/components/Level'
import { QuizCard } from '@/components/QuizCard'

import { styles } from './styles'

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Header
        icon={Trophy}
        title="Vamos estudar"
        subtitle={`Complete os desafios e avance${'\n'} em conhecimento`}
      />

      <View style={styles.levels}>
        <Level title="Fácil" type="EASY" />
        <Level title="Médio" type="MEDIUM" />
        <Level title="Difícil" type="HARD" />
      </View>

      <View style={{ marginTop: 12 }}>
        <QuizCard
          quiz={{
            id: '1',
            title: 'Utilizando Estados',
            level: 1,
            svg: ToggleLeft,
          }}
        />
      </View>
    </View>
  )
}
