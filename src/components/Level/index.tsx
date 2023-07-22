import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

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

interface LevelProps extends TouchableOpacityProps {
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
  const colorChecked = isChecked ? 'checked' : 'unchecked'
  const color = TYPE_COLORS[type][colorChecked]

  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      <View
        style={[
          styles.container,
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
      </View>
    </TouchableOpacity>
  )
}
