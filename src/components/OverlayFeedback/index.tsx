import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'

import { theme } from '@/styles/theme'

export const overlayColor = {
  default: 'transparent',
  success: theme.colors.brand_600,
  error: theme.colors.danger_400,
}

export type overlayColorType = keyof typeof overlayColor

interface OverlayFeedbackProps {
  variant?: keyof typeof overlayColor
}

export function OverlayFeedback({ variant = 'default' }: OverlayFeedbackProps) {
  const { height, width } = useWindowDimensions()
  const color = overlayColor[variant]

  const opacity = useSharedValue(0)

  const styleAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0),
    )
  }, [opacity, variant])

  return (
    <Animated.View
      style={[{ width, height, position: 'absolute' }, styleAnimated]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={color}>
          <BlurMask blur={50} style="inner" />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
