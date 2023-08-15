import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_800,
  },

  history: {
    flexGrow: 1,
    padding: 32,
  },

  swipeableContainer: {
    width: '100%',
    height: 90,
    borderRadius: 6,
    backgroundColor: theme.colors.danger_200,
    marginBottom: 12,
  },

  swipeableRemove: {
    height: 90,
    width: 90,

    borderRadius: 6,
    backgroundColor: theme.colors.danger_200,

    justifyContent: 'center',
    alignItems: 'center',
  },
})
