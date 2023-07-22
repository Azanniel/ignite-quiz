import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    maxWidth: 84,

    paddingHorizontal: 12,
    paddingVertical: 8,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 4,
  },

  title: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    textTransform: 'uppercase',
  },
})
