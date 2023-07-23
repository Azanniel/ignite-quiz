import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 40,
  },

  title: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.gray_100,
    fontSize: 16,
  },

  question: {
    color: theme.colors.gray_200,
  },

  length: {
    color: theme.colors.gray_200,
  },
})
