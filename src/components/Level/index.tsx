import { Text, Pressable, PressableProps } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
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

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const colorChecked = isChecked ? 'checked' : 'unchecked'
  const color = TYPE_COLORS[type][colorChecked]

  function onPressIn() {
    scale.value = 1.2
  }

  function onPressOut() {
    scale.value = 1
  }

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...rest}>
      <Animated.View
        style={[
          styles.container,
          animatedContainerStyle,
          {
            borderColor: color,
            backgroundColor: isChecked ? color : theme.colors.gray_800,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isChecked ? theme.colors.white : color },
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  )
}
