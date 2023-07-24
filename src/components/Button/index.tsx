import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'

import { styles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
