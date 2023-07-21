import { StyleSheet, StatusBar } from 'react-native'
import { THEME } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: THEME.COLORS.GRAY_600,
    paddingHorizontal: 32,
    paddingVertical: 24,
    paddingTop: 24 + (StatusBar.currentHeight || 1),
  },

  title: {
    fontSize: 24,
    fontFamily: THEME.FONTS.BOLD,
    color: THEME.COLORS.GRAY_100,
  },

  subtitle: {
    lineHeight: 22.4,
    fontSize: 14,
    fontFamily: THEME.FONTS.REGULAR,
    color: THEME.COLORS.GRAY_200,
  },

  button: {
    padding: 8,
    borderRadius: 6,

    backgroundColor: THEME.COLORS.GRAY_800,
  },
})
