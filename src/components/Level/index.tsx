import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { THEME } from '@/styles/theme'
import { styles } from './styles'

const TYPE_COLORS = {
  EASY: {
    unchecked: THEME.COLORS.BRAND_200,
    checked: THEME.COLORS.BRAND_400,
  },
  MEDIUM: {
    unchecked: THEME.COLORS.WARNING_200,
    checked: THEME.COLORS.WARNING_400,
  },
  HARD: {
    unchecked: THEME.COLORS.DANGER_200,
    checked: THEME.COLORS.DANGER_400,
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
    <TouchableOpacity {...rest}>
      <View
        style={[
          styles.container,
          {
            borderColor: color,
            backgroundColor: isChecked ? color : THEME.COLORS.GRAY_800,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isChecked ? THEME.COLORS.WHITE : color },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
