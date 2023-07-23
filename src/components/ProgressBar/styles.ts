import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  track: {
    height: 8,
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.colors.gray_500,
  },

  progress: {
    height: 8,
    backgroundColor: theme.colors.brand_300,
    borderRadius: 8,
  },
})
