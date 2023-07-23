import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 76,

    padding: 16,
    marginBottom: 12,

    backgroundColor: theme.colors.gray_800,
    borderRadius: 6,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    flex: 1,
    marginRight: 32,

    color: theme.colors.gray_100,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },

  checked: {
    borderWidth: 1,
    borderColor: theme.colors.brand_200,
  },
})
