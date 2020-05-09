import React, { useState } from 'react'
import { Animated } from 'react-native'
import { TypingAnimation } from 'react-native-typing-animation'
import { useUpdateLayoutEffect } from './hooks/useUpdateLayoutEffect'
export interface TypingIndicatorStyle {
  color: string
  backgroundColor: string
}
interface Props {
  isTyping: boolean
  style?: TypingIndicatorStyle
}

const TypingIndicator = (props: Props) => {
  const [yCoords] = useState(new Animated.Value(200))
  const [heightScale] = useState(new Animated.Value(0))
  const [marginScale] = useState(new Animated.Value(0))

  // on isTyping fire side effect
  useUpdateLayoutEffect(() => {
    if (props.isTyping) {
      slideIn()
    } else {
      slideOut()
    }
  }, [props.isTyping])

  // side effect
  const slideIn = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 35,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start()
  }

  // side effect
  const slideOut = () => {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start()
  }

  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateY: yCoords,
            },
          ],
          height: heightScale,
          marginLeft: 8,
          marginBottom: marginScale,
          width: 45,
          borderRadius: 15,
          backgroundColor:
            (props.style && props.style.backgroundColor) || '#f0f0f0',
        },
      ]}
    >
      <TypingAnimation
        style={{ marginLeft: 6, marginTop: 7.2 }}
        dotRadius={4}
        dotMargin={5.5}
        dotColor={(props.style && props.style.color) || 'rgba(0, 0, 0, 0.38)'}
      />
    </Animated.View>
  )
}

export default TypingIndicator
