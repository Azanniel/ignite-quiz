import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.gray_800,
  },

  levels: {
    marginVertical: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  cards: {
    paddingTop: 32,
  },
})
