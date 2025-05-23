import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, Platform, Dimensions, Animated } from 'react-native';
import { useLogin } from '@privy-io/expo/ui';
import { useLoginWithOAuth, LoginWithOAuthInput } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { login } = useLogin();
  const oauth = useLoginWithOAuth();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleEmailLogin = () => {
    login({ loginMethods: ["email"] })
      .then((session) => {
        console.log("User logged in", session.user);
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const handleOAuthLogin = (provider: LoginWithOAuthInput['provider']) => {
    oauth.login({ provider })
      .catch((err) => {
        console.error(`${provider} login error:`, err);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Image
        source={{ uri: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.gradientOverlay} />
      </View>
      
      <Animated.View style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>ELEVANTO</Text>
          <Text style={styles.subtitle}>Elevate Your Public Speaking</Text>
          
          <View style={styles.featuresContainer}>
            {[
              { icon: 'mic-outline', text: 'AI Speech Analysis' },
              { icon: 'trending-up-outline', text: 'Progress Tracking' },
              { icon: 'people-outline', text: 'Expert Feedback' }
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name={feature.icon as any} size={24} color="#fff" />
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.authContainer}>
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailLogin}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="rocket-outline" size={24} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.emailButtonText}>Begin Your Journey</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            {(['google', 'apple', 'github'] as const).map((provider) => (
              <TouchableOpacity
                key={provider}
                style={[styles.socialButton, styles[`${provider}Button`]]}
                onPress={() => handleOAuthLogin(provider)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={`logo-${provider}` as any}
                  size={24}
                  color={provider === 'github' ? '#fff' : '#1a1a1a'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.motivationalText}>
            "The human voice is the most beautiful instrument of all, but it is the most difficult to play."
          </Text>
          <Text style={styles.authorText}>- Richard Strauss</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backgroundImage: Platform.select({
      web: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
      default: undefined,
    }),
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
    fontWeight: '300',
  },
  title: {
    fontSize: 52,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.9,
    letterSpacing: 1,
    marginBottom: 40,
    fontWeight: '300',
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    gap: 12,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 16,
    width: width * 0.27,
    backdropFilter: Platform.OS === 'web' ? 'blur(10px)' : undefined,
  },
  featureIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  featureText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
  authContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailButton: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 12,
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  appleButton: {
    backgroundColor: '#fff',
  },
  githubButton: {
    backgroundColor: '#333',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  motivationalText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 24,
    maxWidth: '90%',
  },
  authorText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    fontWeight: '500',
  },
});