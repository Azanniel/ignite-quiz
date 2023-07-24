import { Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { Button } from '@/components/Button'

import { styles } from './styles'

export default function Finish() {
  const { points, total } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.title}>Parabéns!</Text>

        <Text style={styles.subtitle}>
          Você acertou {points} de {total} questões
        </Text>
      </View>

      <Button title="Ir para o início" onPress={() => router.push('/')} />
    </View>
  )
}
