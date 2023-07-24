import { Text, View } from 'react-native'

import { LevelBars } from '../LevelBars'
import { HistoryDTO } from '@/storage/dtos/history'

import { styles } from './styles'

interface HistoryCardProps {
  data: HistoryDTO
}

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{data.title}</Text>

        <Text style={styles.subtitle}>
          Você acertou {data.points} de {data.questions}
        </Text>
      </View>

      <LevelBars level={data.level} />
    </View>
  )
}
