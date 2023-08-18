import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_800,
  },

  title: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.gray_100,
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },

  question: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 80,
  },

  header: {
    width: '100%',
    marginBottom: 21,
  },

  footer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
})
