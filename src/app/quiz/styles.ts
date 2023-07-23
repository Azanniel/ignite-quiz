import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_800,
  },

  question: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 300,
  },

  footer: {
    flexDirection: 'row',
    marginTop: 24,
  },
})
