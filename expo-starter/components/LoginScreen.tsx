import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useLogin } from '@privy-io/expo/ui';
import { useLoginWithOAuth, LoginWithOAuthInput } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useLogin();
  const oauth = useLoginWithOAuth();

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
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to ELEVANTO</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.authContainer}>
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailLogin}
          >
            <Ionicons name="mail-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            {(['google', 'apple', 'github'] as const).map((provider) => (
              <TouchableOpacity
                key={provider}
                style={styles.socialButton}
                onPress={() => handleOAuthLogin(provider)}
              >
                <Ionicons
                  name={`logo-${provider}` as any}
                  size={20}
                  color="#1a1a1a"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  authContainer: {
    marginBottom: 24,

  },
  emailButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});

