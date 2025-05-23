import React from 'react';
import Constants from "expo-constants";
import { Tabs, useRouter, useSegments } from "expo-router";
import { PrivyProvider, usePrivy } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

function useProtectedRoute() {
  const { user } = usePrivy();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const currentPath = segments.join('/');
    if (!user) {
      router.replace('/');
    } else if (currentPath === '') {
      router.replace('/home');
    }
  }, [user, segments]);
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <RootLayoutNav />
      <PrivyElements />
    </PrivyProvider>
  );
}

function RootLayoutNav() {
  const { user } = usePrivy();
  useProtectedRoute();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: user ? 'flex' : 'none',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rejection"
        options={{
          title: 'Rejection',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
