import { View } from 'react-native'

import { styles } from './styles'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <View style={styles.track}>
      <View style={[styles.progress, { width: `${percentage}%` }]} />
    </View>
  )
}
