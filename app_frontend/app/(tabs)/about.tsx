import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>About This App</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Overview</Text>
          <Text style={styles.sectionText}>
            This is a simple "Hello World" app built with Expo and Expo Router. It demonstrates the use of 
            tabs-based navigation, responsive layouts, and proper styling in a React Native application.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology Stack</Text>
          <View style={styles.techItem}>
            <ExternalLink size={20} color="#3B82F6" style={styles.icon} />
            <Text style={styles.techText}>Expo Framework</Text>
          </View>
          <View style={styles.techItem}>
            <ExternalLink size={20} color="#3B82F6" style={styles.icon} />
            <Text style={styles.techText}>React Native</Text>
          </View>
          <View style={styles.techItem}>
            <ExternalLink size={20} color="#3B82F6" style={styles.icon} />
            <Text style={styles.techText}>Expo Router</Text>
          </View>
          <View style={styles.techItem}>
            <ExternalLink size={20} color="#3B82F6" style={styles.icon} />
            <Text style={styles.techText}>TypeScript</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.sectionText}>
            • Tab-based navigation structure{'\n'}
            • Responsive layouts{'\n'}
            • Animation effects{'\n'}
            • Clean, modern UI design{'\n'}
            • Platform-specific code handling
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Created with Expo • {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 24,
    marginTop: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
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
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  sectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  techText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#334155',
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});