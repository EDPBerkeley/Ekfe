import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SkeletonLoader = ({width, height}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create({
    skeletonContainer: {
      width: width,
      height: height,
      backgroundColor: '#e1e1e1',
      overflow: 'hidden',
    },
    animatedContainer: {
      height: '300%',
      width: '300%',
    },
    linearGradient: {
      flex: 1,
    },
  });


  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000, // Adjust the speed of the animation
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200], // Horizontal movement range
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200], // Vertical movement range
  });

  return (
    <View style={styles.skeletonContainer}>
      <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateX }, {translateY}] }}>
        <LinearGradient
          colors={['transparent', 'rgba(200,200,200,0.5)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        />
      </Animated.View>
    </View>
  );
};


export default SkeletonLoader;
