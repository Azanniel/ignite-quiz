import { View } from 'react-native'
import { Trophy } from 'phosphor-react-native'

import { Header } from '@/components/Header'

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <Header
        icon={Trophy}
        title="Vamos estudar"
        subtitle={`Complete os desafios e avance${'\n'} em conhecimento`}
      />
    </View>
  )
}
