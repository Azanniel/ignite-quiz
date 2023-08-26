import { useEffect } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  Canvas,
  Skia,
  Path,
  useValue,
  runTiming,
  BlurMask,
  Circle,
  Easing,
} from '@shopify/react-native-skia'

import { theme } from '@/styles/theme'
import { styles } from './styles'

interface OptionProps extends TouchableOpacityProps {
  title: string
  checked: boolean
}

const CHECK_SIZE = 28
const CHECK_STROKE_WIDTH = 2
const CHECK_RADIUS = (CHECK_SIZE - CHECK_STROKE_WIDTH) / 2

export function Option({ title, checked, ...rest }: OptionProps) {
  const percentagePath = useValue(0)
  const circleRadius = useValue(0)

  const path = Skia.Path.Make()

  path.addCircle(CHECK_SIZE, CHECK_SIZE, CHECK_RADIUS)

  useEffect(() => {
    if (checked) {
      runTiming(percentagePath, 1, { duration: 600 })
      runTiming(circleRadius, CHECK_RADIUS / 2, {
        easing: Easing.bounce,
        duration: 800,
      })
    } else {
      runTiming(percentagePath, 0, { duration: 200 })
      runTiming(circleRadius, 0, { easing: Easing.bounce, duration: 300 })
    }
  }, [checked, circleRadius, percentagePath])

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      activeOpacity={0.6}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={theme.colors.gray_500}
          style="stroke"
          strokeWidth={CHECK_STROKE_WIDTH}
        />

        <Path
          path={path}
          color={theme.colors.brand_300}
          style="stroke"
          strokeWidth={CHECK_STROKE_WIDTH}
          start={0}
          end={percentagePath}
        >
          <BlurMask blur={1} style="solid" />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circleRadius}
          color={theme.colors.brand_300}
        >
          <BlurMask blur={4} style="solid" />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  )
}
