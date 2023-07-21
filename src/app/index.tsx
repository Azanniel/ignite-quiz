import { View } from 'react-native'
import { Trophy } from 'phosphor-react-native'

import { Header } from '@/components/Header'
import { Level } from '@/components/Level'
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
    </View>
  )
}
