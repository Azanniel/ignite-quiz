import { View } from 'react-native'

import { theme } from '@/styles/theme'
import { styles } from './styles'

const LEVEL_COLORS = [
  theme.colors.brand_200,
  theme.colors.warning_200,
  theme.colors.danger_200,
]

interface LevelBarsProps {
  level: number
}

export function LevelBars({ level }: LevelBarsProps) {
  const backgroundColor = LEVEL_COLORS[level - 1]

  return (
    <View style={styles.bars}>
      <View style={[styles.level, { backgroundColor, height: 6 }]} />

      <View
        style={[styles.level, { height: 12 }, level > 1 && { backgroundColor }]}
      />

      <View
        style={[styles.level, { height: 20 }, level > 2 && { backgroundColor }]}
      />
    </View>
  )
}
