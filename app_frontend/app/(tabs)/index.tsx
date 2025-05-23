import { View, Text, StyleSheet, Animated, Pressable, Platform } from 'react-native';
import { useState, useRef } from 'react';

export default function HomeScreen() {
  const [pressed, setPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    setPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    setPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Expo!</Text>
      
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.cardContainer,
          pressed && Platform.OS === 'ios' && styles.cardPressed,
        ]}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.cardTitle}>Hello World</Text>
          <Text style={styles.cardText}>
            This is a simple Expo app with tab navigation built using Expo Router.
          </Text>
        </Animated.View>
      </Pressable>
      
      <Text style={styles.instructions}>
        Tap the card above to see a subtle animation effect.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 24,
    marginTop: 40,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    marginVertical: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 12,
  },
  cardText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  instructions: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
  },
});