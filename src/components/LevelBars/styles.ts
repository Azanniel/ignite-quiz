import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  level: {
    width: 4,
    backgroundColor: theme.colors.gray_500,
    borderRadius: 6,
    marginLeft: 4,
  },
})
