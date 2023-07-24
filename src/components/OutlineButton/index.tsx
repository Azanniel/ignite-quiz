import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'

import { styles } from './styles'

interface OutlineButtonProps extends TouchableOpacityProps {
  title: string
}

export function OutlineButton({ title, ...rest }: OutlineButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
