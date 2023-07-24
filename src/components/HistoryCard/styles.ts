import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    borderRadius: 6,
    backgroundColor: theme.colors.gray_700,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    color: theme.colors.gray_100,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
  },

  subtitle: {
    color: theme.colors.gray_300,
    fontSize: 12,
  },
})
