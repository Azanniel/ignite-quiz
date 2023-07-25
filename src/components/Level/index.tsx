import { useEffect } from 'react'
import { Pressable, PressableProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated'

import { theme } from '@/styles/theme'
import { styles } from './styles'

const TYPE_COLORS = {
  EASY: {
    unchecked: theme.colors.brand_200,
    checked: theme.colors.brand_400,
  },
  MEDIUM: {
    unchecked: theme.colors.warning_200,
    checked: theme.colors.warning_400,
  },
  HARD: {
    unchecked: theme.colors.danger_200,
    checked: theme.colors.danger_400,
  },
}

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

interface LevelProps extends PressableProps {
  title: string
  isChecked?: boolean
  type?: keyof typeof TYPE_COLORS
}

export function Level({
  title,
  type = 'EASY',
  isChecked = false,
  ...rest
}: LevelProps) {
  const scale = useSharedValue(1)
  const checked = useSharedValue(1)

  const colorChecked = isChecked ? 'checked' : 'unchecked'
  const color = TYPE_COLORS[type][colorChecked]

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        [theme.colors.gray_800, color],
      ),
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [color, theme.colors.white],
      ),
    }
  })

  function onPressIn() {
    scale.value = withTiming(1.1, { duration: 200 })
  }

  function onPressOut() {
    scale.value = withTiming(1, { duration: 200 })
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, { duration: 200 })
  }, [checked, isChecked])

  return (
    <PressableAnimated
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.container, animatedContainerStyle, { borderColor: color }]}
      {...rest}
    >
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  )
}
