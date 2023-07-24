import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

const { width } = Dimensions.get('window')

const MARGIN_HORIZONTAL = 24 * 2

export const styles = StyleSheet.create({
  container: {
    width: width - MARGIN_HORIZONTAL,
    backgroundColor: theme.colors.gray_700,
    borderRadius: 12,
    padding: 22,
  },

  title: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18,
  },
})
