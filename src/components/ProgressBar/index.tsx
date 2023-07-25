import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { styles } from './styles'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  const sharedPercentage = useSharedValue(percentage)
  const trackAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedPercentage.value}%`,
    }
  })

  useEffect(() => {
    sharedPercentage.value = withTiming(percentage)
  }, [percentage, sharedPercentage])

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, trackAnimatedStyle]} />
    </View>
  )
}
