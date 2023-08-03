import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native'
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated'
import { IconProps } from 'phosphor-react-native'

import { LevelBars } from '../LevelBars'

import { theme } from '@/styles/theme'
import { styles } from './styles'

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity)

export interface Quiz {
  id: string
  title: string
  level: number
  svg: React.FC<IconProps>
}

interface QuizCardProps extends TouchableOpacityProps {
  index: number
  quiz: Quiz
}

export function QuizCard({ quiz, index, ...rest }: QuizCardProps) {
  const Icon = quiz.svg

  return (
    <TouchableOpacityAnimated
      style={styles.container}
      activeOpacity={0.6}
      entering={FadeInUp.delay(index * 100)}
      exiting={FadeOut}
      {...rest}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={theme.colors.gray_100} />}
        </View>

        <LevelBars level={quiz.level} />
      </View>

      <Text style={styles.title}>{quiz.title}</Text>
    </TouchableOpacityAnimated>
  )
}
