import { Tabs } from 'expo-router';
import { Chrome as Home, Info } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: 'Hello World',
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => <Info color={color} size={size} />,
          headerTitle: 'About This App',
        }}
      />
    </Tabs>
  );
}