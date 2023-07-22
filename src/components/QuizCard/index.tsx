import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from 'react-native'
import { IconProps } from 'phosphor-react-native'

import { LevelBars } from '../LevelBars'

import { theme } from '@/styles/theme'
import { styles } from './styles'

export interface Quiz {
  id: string
  title: string
  level: number
  svg: React.FC<IconProps>
}

interface QuizCardProps extends TouchableOpacityProps {
  quiz: Quiz
}

export function QuizCard({ quiz, ...rest }: QuizCardProps) {
  const Icon = quiz.svg

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={theme.colors.gray_100} />}
        </View>

        <LevelBars level={quiz.level} />
      </View>

      <Text style={styles.title}>{quiz.title}</Text>
    </TouchableOpacity>
  )
}
