import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Check } from 'phosphor-react-native'

import { theme } from '@/styles/theme'
import { styles } from './styles'

export function ConfirmButton({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} {...rest}>
      <Text style={styles.title}>Confirmar</Text>

      <Check color={theme.colors.white} weight="bold" size={24} />
    </TouchableOpacity>
  )
}
