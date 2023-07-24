import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: theme.colors.brand_400,
    borderRadius: 6,

    backgroundColor: 'transparent',

    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  title: {
    color: theme.colors.brand_400,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
})
