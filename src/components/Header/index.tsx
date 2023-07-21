import { Text, TouchableOpacity, View } from 'react-native'
import { IconProps } from 'phosphor-react-native'

import { THEME } from '@/styles/theme'
import { styles } from './styles'

interface HeaderProps {
  title: string
  subtitle: string
  icon: React.FC<IconProps>
}

export function Header({ title, subtitle, icon: Icon }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Icon size={28} weight="bold" color={THEME.COLORS.GRAY_100} />
      </TouchableOpacity>
    </View>
  )
}
