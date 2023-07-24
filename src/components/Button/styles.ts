import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: 56,
    maxHeight: 56,

    backgroundColor: theme.colors.brand_400,
    borderRadius: 6,

    marginRight: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  title: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
})
