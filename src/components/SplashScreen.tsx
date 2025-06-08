import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
    ]).start();

    // Navigate to main app after 2 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#b3d8fd", "#a3c9f7", "#8bb8f7"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.mainText}>Let's generate awesome passwords</Text>
        </Animated.View>
        <Text style={styles.handle}>@dhiraj</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  mainText: {
    fontSize: 22,
    color: '#6b4bb6',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
  handle: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#6b4bb6',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});

export default SplashScreen; 