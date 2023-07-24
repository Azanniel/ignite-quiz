import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray_800,
    padding: 32,
  },

  message: {
    alignItems: 'center',
    marginBottom: 80,
  },

  title: {
    color: theme.colors.gray_100,
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    marginTop: 41,
  },

  subtitle: {
    color: theme.colors.gray_100,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    marginTop: 8,
  },
})
