import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_800,
  },

  content: {
    marginTop: 20,
  },

  question: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 80,
  },

  footer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
})
