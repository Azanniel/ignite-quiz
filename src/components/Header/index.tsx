import { Text, TouchableOpacity, View } from 'react-native'
import { IconProps } from 'phosphor-react-native'

import { theme } from '@/styles/theme'
import { styles } from './styles'

interface HeaderProps {
  title: string
  subtitle: string
  icon: React.FC<IconProps>
  onPress: () => void
}

export function Header({ title, subtitle, icon: Icon, onPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Icon size={28} weight="bold" color={theme.colors.gray_100} />
      </TouchableOpacity>
    </View>
  )
}
