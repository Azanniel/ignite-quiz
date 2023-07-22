import { StyleSheet, StatusBar } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: theme.colors.gray_600,
    paddingHorizontal: 32,
    paddingVertical: 24,
    paddingTop: 24 + (StatusBar.currentHeight || 1),
  },

  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.gray_100,
  },

  subtitle: {
    lineHeight: 22.4,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray_200,
  },

  button: {
    padding: 8,
    borderRadius: 6,

    backgroundColor: theme.colors.gray_800,
  },
})
