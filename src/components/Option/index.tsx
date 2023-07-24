import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { styles } from './styles'

interface OptionProps extends TouchableOpacityProps {
  title: string
  checked: boolean
}

export function Option({ title, checked, ...rest }: OptionProps) {
  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      activeOpacity={0.6}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}
